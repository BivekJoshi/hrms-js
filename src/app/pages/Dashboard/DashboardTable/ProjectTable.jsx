import { Box, Stack, Button, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MaterialTable from "@material-table/core";
import React from "react";

export const ProjectTable = ({ projectData }) => {
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 60,
      sortable: false,
    },
    {
      title: "Project Name",
      field: "projectName",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Started",
      field: "startDate",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Progress",
      render: (rowData) => (<LinearProgress variant="determinate" value={50} />),
      width: 200,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button
            color="primary"
            onClick={() => handleEditDesignation(rowData)}
          >
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => handleDeleteDesignation(rowData)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 60,
    },
  ];
  return (
    <>
      <Box>
        <MaterialTable
          columns={columns}
          data={projectData}
          title="Recent Projects"
          options={{
            padding: "dense",
            margin: 50,
            pageSize: 10,
            emptyRowsWhenPaging: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              fontSize: 20,
              padding: "dense",
              height: 50,
            },
            rowStyle: {
              fontSize: 18,
            },
          }}
        />
      </Box>
    </>
  );
};
