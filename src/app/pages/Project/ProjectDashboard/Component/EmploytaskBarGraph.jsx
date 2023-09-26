import { Box, Typography } from "@mui/material";
import React from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine } from "recharts";
import { ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const EmploytaskBarGraph = () => {
  const data = [
    {
      name: "Sujana",
      taskProgress: 24,
    },
    {
      name: "Bivek",
      taskProgress: 100,
    },
    {
      name: "Ganesh",
      taskProgress: 20,
    },
    {
      name: "Dhiraj",
      taskProgress: 27,
    },
    {
      name: "Sujan",
      taskProgress: 18,
    },
    {
      name: "Pujan",
      taskProgress: 23,
    },
  ];
  return (
    <ResponsiveContainer width="80%" >
      <AreaChart
        data={data}
        // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
        <ReferenceLine y={100} label="Max" stroke="red" strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="taskProgress"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
