import React from "react";
import { Layout, Card, Typography } from "antd";
import axios from "axios";
import Chart from "../components/Chart";
import DashboardBox from "../components/DashboardBox";
import { Map } from "../components/Map";
import Sidebar from "../components/Sidebar";

const { Content, Footer } = Layout;
const { Title } = Typography;

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

class Dashboard extends React.Component {
  state = {
    cases: "",
    activeCases: "",
    recovered: "",
    death: "",
    historyCases: "",
    historyDeaths: "",
    vaccine: "",
  };

  fetchAllCovid = () => {
    axios.get("https://disease.sh/v3/covid-19/all").then((res) =>
      this.setState({
        cases: res.data.cases,
        activeCases: res.data.active,
        recovered: res.data.recovered,
        death: res.data.deaths,
      })
    );
  };

  fetch14daysCovid = () => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=14")
      .then((res) =>
        this.setState({
          historyCases: res.data.cases,
          historyDeaths: res.data.deaths,
        })
      );
  };

  fetch14daysVaccine = () => {
    axios
      .get(
        "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30&fullData=false"
      )
      .then((res) =>
        this.setState({
          vaccine: res.data,
        })
      );
  };

  componentDidMount() {
    document.title = "Covid Dashboard";
    this.fetchAllCovid();
    this.fetch14daysCovid();
    this.fetch14daysVaccine();
  }

  covidCharts = () => {
    const dataCharts = {
      labels: Object.keys(this.state.historyCases),
      datasets: [
        {
          label: "Cases",
          data: Object.values(this.state.historyCases),
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
          label: "Vaccine",
          data: Object.values(this.state.vaccine),
          fill: false,
          backgroundColor: "rgb(124,252,0)",
          borderColor: "rgba(124,252,0, 0.2)",
        },
      ],
    };

    return dataCharts;
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
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
                  <DashboardBox
                    title="Cases"
                    type="danger"
                    number={this.state.cases}
                  />
                  <DashboardBox
                    title="Active Cases"
                    type="warning"
                    number={this.state.activeCases}
                  />
                  <DashboardBox
                    title="Recovered"
                    type="success"
                    number={this.state.recovered}
                  />
                  <DashboardBox
                    title="Deaths"
                    type="secondary"
                    number={this.state.death}
                  />
                </div>
                <Card>
                  <Map />
                </Card>
              </div>
              <div className="rightContent">
                <Chart
                  title="Vaccine Last 14 Days"
                  data={this.vaccineChart()}
                  options={options}
                  height={150}
                />
                <Chart
                  title="Covid-19 Last 14 Days"
                  data={this.covidCharts()}
                  options={options}
                  height={150}
                />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2021 Created by Heri Susanto Arisman
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
