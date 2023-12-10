import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import './Style/Style.css';

export const PieChartDiagram = ({ data }) => {
  const piedata = [
    {
      name: 'All Employees',
      value: data?.allEmployees,
    },
    {
      name: 'New Employees',
      value: data?.newEmployees,
    },
    {
      name: 'Female Employees',
      value: data?.femaleEmployees,
    },
    {
      name: 'Male Employees',
      value: data?.maleEmployees,
    },
    {
      name: 'All Projects',
      value: data?.allProjects,
    },
  ];

  const COLORS = ['#F65E3C', '#A1E000', '#9137B8', '#D93084', '#B6D0D9'];

  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className='CirecleBullet'
        style={{
          backgroundColor,
          width: size,
          height: size,
        }}
      ></div>
    );
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart
          width={650}
          height={300}
          style={{ position: 'inherit', paddingLeft: '3rem' }}
        >
          <Pie
            data={piedata}
            dataKey='value'
            nameKey='name'
            cx='65%'
            cy='65%'
            outerRadius={70}
            fill='#8884d8'
          >
            {piedata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Pie
            style={{ background: 'black' }}
            data={piedata}
            dataKey='value'
            nameKey='name'
            cx='65%'
            cy='65%'
            innerRadius={80}
            outerRadius={100}
            fill='#82ca9d'
            label
          >
            {piedata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Legend
        style={{ width: 'fit-content' }}
        content={
          <ul className='Legend'>
            {piedata.map((entry, index) => (
              <Box key={`item-${index}`}>
                <div className='BulletLabel'>
                  <Bullet
                    backgroundColor={COLORS[index % COLORS.length]}
                    size='10px'
                  />
                  <div className='BulletLabelText'>{entry.name}</div>
                  <div style={{ marginLeft: '20px' }}>{entry.value}</div>
                </div>
              </Box>
            ))}
          </ul>
        }
      />
    </div>
  );
};
