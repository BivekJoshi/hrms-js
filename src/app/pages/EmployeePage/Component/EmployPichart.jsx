import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";
import "../Style/Style.css";

export const EmployPichart = ({}) => {
  const task = [
    { nameOfTask: "Total Project", numberOfTask: 4 },
    { nameOfTask: "Total Task", numberOfTask: 4 },
    { nameOfTask: "Task Pending", numberOfTask: 7 },
    { nameOfTask: "Task Complete", numberOfTask: 8 },
  ];

  const COLORS = ["#F65E3C", "#A1E000", "#9137B8", "#D93084"];

  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size,
        }}
      ></div>
    );
  };

  return (
    <Box className="pichartStyle" >
      <ResponsiveContainer width="100%" height={250}>
        <PieChart
          width={300}
          height={150}
          style={{ position: "inherit", paddingLeft: "3rem" }}
        >
          <Pie
            data={task}
            dataKey="numberOfTask"
            nameKey="nameOfTask"
            cx="55%"
            cy="35%"
            outerRadius={60}
            fill="#8884d8"
          >
            {task.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Legend
        content={
          <ul className="LegendList">
            {task.map((entry, index) => (
              <Box key={`item-${index}`}>
                <div className="BulletLabel">
                  <Bullet
                    backgroundColor={COLORS[index % COLORS.length]}
                    size="10px"
                  />
                  <div style={{ fontSize: ".8rem" }}>{entry.nameOfTask}</div>
                  <div style={{ marginLeft: "5px", fontSize: ".8rem" }}>
                    {entry.numberOfTask}
                  </div>
                </div>
              </Box>
            ))}
          </ul>
        }
      />
    </Box>
  );
};
