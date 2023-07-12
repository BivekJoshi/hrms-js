import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Button, Stack } from "@mui/material";
import { useGetDeactivatedEmployee } from "../../../hooks/employee/DeactivateEmploye/useEmployee";


const DeactivatedEmployee = () => {
  const { data: deactivatedEmployee, isLoading } = useGetDeactivatedEmployee();

  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [activateProject, setActivateProject] = useState({});
  const handleCloseActivateModal = () => setOpenActivateModal(false);

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 120,
      sortable: false,
    },
    {
      title: "first Name",
      field: "firstName",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Action",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button
            variant="contained"
            color="primary"
          >
            Activate Employee
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 120,
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <MaterialTable
        columns={columns}
        data={deactivatedEmployee}
        title="In Active Projects"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
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
    </>
  );
};

export default DeactivatedEmployee;
