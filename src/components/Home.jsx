import React from "react";
import {
  Layout,
  Menu,
  Card,
  Typography,
  Row,
  Col,
  List,
  Input,
  Space,
  Carousel,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Map } from "./Map";
import { Line } from "react-chartjs-2";
import "./Home.css";
import Doctor from "../assets/img/doctor-woman.svg";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;
const { Search } = Input;

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

class Home extends React.Component {
  state = {
    cases: "",
    activeCases: "",
    recovered: "",
    death: "",
    data: "",
    history: "",
    vaccine: "",
  };

  componentDidMount() {
    axios.get("https://disease.sh/v3/covid-19/all").then((res) =>
      this.setState({
        cases: res.data.cases,
        activeCases: res.data.active,
        recovered: res.data.recovered,
        death: res.data.deaths,
      })
    );
    axios.get("https://disease.sh/v3/covid-19/countries").then((res) =>
      this.setState({
        data: res.data,
      })
    );
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=14")
      .then((res) =>
        this.setState({
          history: res.data.cases,
        })
      );
    axios
      .get(
        "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30&fullData=false"
      )
      .then((res) =>
        this.setState({
          vaccine: res.data,
        })
      );

    this.chartJs();
  }

  onSearch = (value) => {
    alert(value);
  };

  chartJs = () => {
    const dataCharts = {
      labels: Object.keys(this.state.history),
      datasets: [
        {
          label: "Cases",
          data: Object.values(this.state.history),
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };

    return dataCharts;
  };

  vaccineChart = () => {
    const dataCharts = {
      labels: Object.keys(this.state.vaccine),
      datasets: [
        {
          label: "Cases",
          data: Object.values(this.state.vaccine),
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };

    return dataCharts;
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={true}
          onCollapse={this.onCollapse}
          trigger={null}
        >
          <div className="logo">
            <h1
              style={{ color: "white", textAlign: "center", padding: "20px" }}
            >
              Heri
            </h1>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Title level={2} style={{ margin: "16px" }}>
            Global Trends
          </Title>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="leftContent">
                <div className="site-card-wrapper">
                  <Card bordered={false}>
                    <h1>Cases</h1>
                    <Title type="danger" level={2}>
                      {this.state.cases.toLocaleString()}
                    </Title>
                  </Card>
                  <Card bordered={false}>
                    <h1>Active Cases</h1>
                    <Title type="warning" level={2}>
                      {this.state.activeCases.toLocaleString()}
                    </Title>
                  </Card>
                  <Card bordered={false}>
                    <h1>Recovered</h1>
                    <Title type="success" level={2}>
                      {this.state.recovered.toLocaleString()}
                    </Title>
                  </Card>
                  <Card bordered={false}>
                    <h1>Deaths</h1>
                    <Title type="secondary" level={2}>
                      {this.state.death.toLocaleString()}
                    </Title>
                  </Card>
                </div>
                <Card>
                  <Map />
                </Card>
              </div>
              <div className="rightContent">
                <Card title="Vaccine Last 14 Days">
                  <Line
                    data={this.vaccineChart()}
                    options={options}
                    height={150}
                  />
                </Card>
                <Card title="Coivid-19 Last 14 Days">
                  <Line data={this.chartJs()} options={options} height={150} />
                </Card>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
