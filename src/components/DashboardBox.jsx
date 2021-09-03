import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const DashboardBox = ({ title, type, number }) => {
  return (
    <Card bordered={false}>
      <h1>{title}</h1>
      <Title type={type} level={2}>
        {number.toLocaleString()}
      </Title>
    </Card>
  );
};

export default DashboardBox;
