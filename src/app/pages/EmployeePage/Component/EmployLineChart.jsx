import { Box, Typography } from "@mui/material";
import React from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine } from "recharts";
import { ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const EmployLineChart = () => {
  const data = [
    {
      name: "JAN",
      attention: 24,
    },
    {
      name: "FEB",
      attention: 30,
    },
    {
      name: "MAR",
      attention: 20,
    },
    {
      name: "APR",
      attention: 27,
    },
    {
      name: "MAY",
      attention: 18,
    },
    {
      name: "JUN",
      attention: 23,
    },
    {
      name: "JUL",
      attention: 30,
    },
    {
      name: "AUG",
      attention: 10,
    },
    {
      name: "SEP",
      attention: 24,
    },
    {
      name: "OCT",
      attention: 22,
    },
    {
      name: "NOV",
      attention: 30,
    },
    {
      name: "DEC",
      attention: 20,
    },
  ];
  return (
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
          <ReferenceLine
            y={32}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area type="monotone" dataKey="attention" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
  );
};
