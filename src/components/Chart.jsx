import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";

const Chart = ({ title, data, options, height }) => {
  return (
    <Card title={title}>
      <Line data={data} options={options} height={height} />
    </Card>
  );
};

export default Chart;
