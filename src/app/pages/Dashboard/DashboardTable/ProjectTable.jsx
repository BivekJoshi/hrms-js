import { Box, Stack, Button, LinearProgress } from '@mui/material';
// import DeleteIcon from "@mui/icons-material/Delete";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MaterialTable from '@material-table/core';
import React from 'react';
import '../Style/Style.css';

export const ProjectTable = ({ projectData }) => {
  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.index + 1,
      width: 60,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Project Name',
      field: 'projectName',
      emptyValue: '-',
      width: 'auto',
      sorting: false,
      render: (rowData) => {
        return (
          <div
            style={{
              maxWidth: '100%', // Adjust the width as needed
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limit to two lines
              overflow: 'hidden',
              whiteSpace: 'normal', // Allow wrapping
              wordBreak: 'break-word',
            }}
          >
            {rowData?.projectName}
          </div>
        );
      },
    },
    {
      title: 'Started',
      field: 'startDate',
      emptyValue: '-',
      width: 150,
      sorting: false,
    },
    // {
    //   title: "Progress",
    //   render: (rowData) => (<LinearProgress variant="determinate" value={50} />),
    //   width: 400,
    //   sorting: false,
    // },
  ];
  return (
    <>
      <MaterialTable
        columns={columns}
        data={projectData}
        title='Recent Projects'
        layout
        options={{
          search: false,
          tableLayout: 'fixed',
          padding: 'default',

          pageSize: 5,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            fontSize: '1rem',
            padding: 'dense',
          },
          rowStyle: {
            fontSize: '.8rem',
          },
        }}
      />
    </>
  );
};
