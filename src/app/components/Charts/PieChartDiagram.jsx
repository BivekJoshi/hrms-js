import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Box } from "@mui/material";
import "./Style/Style.css"

export const PieChartDiagram = ({data}) => {
  const piedata = [
    {
      name: "All Employees",
      value: data?.allEmployees,
    },
    {
      name: "All Projects",
      value: data?.allProjects,
    },
    {
      name: "Female Employees",
      value: data?.femaleEmployees,
    },
    {
      name: "Male Employees",
      value: data?.maleEmployees,
    },
    {
      name: "New Employees",
      value: data?.newEmployees,
    },
  ];

  const COLORS = ["#F65E3C", "#A1E000", "#9137B8", "#D93084", "#B6D0D9"];

  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size
        }}
      ></div>
    );
  };

  return (
    <Box className="pichartStyle">
      <PieChart width={730} height={300} style={{position:"inherit"}}>
        <Pie
          data={piedata}
          dataKey="value"
          nameKey="name"
          cx="55%"
          cy="55%"
          outerRadius={80}
          fill="#8884d8"
        >
          {piedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
        style={{background:"black"}}
          data={piedata}
          dataKey="value"
          nameKey="name"
          cx="55%"
          cy="55%"
          innerRadius={90}
          outerRadius={110}
          fill="#82ca9d"
          label
        >
          {piedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Legend
        content={
          <ul className="LegendList">
            {piedata.map((entry, index) => (
              <Box key={`item-${index}`} >
                <div className="BulletLabel">
                  <Bullet backgroundColor={COLORS[index % COLORS.length]} size="10px" />
                  <div className="BulletLabelText">{entry.name}</div>
                  <div style={{ marginLeft: "20px" }}>{entry.value}</div>

                </div>
              </Box>
            ))}
          </ul>
        }
      />
    </Box>
  );
};