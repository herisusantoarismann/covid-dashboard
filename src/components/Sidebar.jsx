import React from "react";
import { Layout, Menu } from "antd";
import {
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
          CD
        </h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<GlobalOutlined />}>
          Global
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
