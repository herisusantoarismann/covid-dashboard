import React from "react";
import { Layout, Menu } from "antd";
import {
  FlagOutlined,
  FileOutlined,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible collapsed={true} trigger={null}>
      <div className="logo">
        <h1
          style={{
            color: "white",
            textAlign: "center",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          C9
        </h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<GlobalOutlined />}>
          Global
        </Menu.Item>
        <Menu.Item key="2" icon={<FlagOutlined />}>
          Country
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />}>
          News
        </Menu.Item>
        <Menu.Item key="4" icon={<BulbOutlined />}>
          Tips
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
