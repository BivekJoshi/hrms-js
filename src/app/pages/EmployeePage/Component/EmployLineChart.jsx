import React from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine } from "recharts";
import { ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const EmployLineChart = ({ attendanceData }) => {
  const workDays =attendanceData ? attendanceData?.map(
    (data) => data?.attendanceCountRes?.presentDays
  ):"";

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart
        data={attendanceData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="monthBS" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
        <ReferenceLine y={32} label="Max" stroke="red" strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey={workDays}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
