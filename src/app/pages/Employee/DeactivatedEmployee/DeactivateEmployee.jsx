import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useGetDeactivatedEmployee } from "../../../hooks/employee/DeactivateEmploye/useEmployee";
import { EditActivationEmployeeModal } from "../EmployeeDeactivationModal/EditDeactivationEmployeeModal";


const DeactivatedEmployee = () => {
  const { data: deactivateEmployee, isLoading } = useGetDeactivatedEmployee();

  const [openDeactivatedModal, setOpenDeactivatedModal] = useState(false);
  const [deactivatedEmployee, setDeactivatedEmployee] = useState({});
  const handleCloseDeactivatedModal = () => setOpenDeactivatedModal(false);

  const handleDeactivatedEmployee = (rowData) => {
    setDeactivatedEmployee(rowData);
    setOpenDeactivatedModal(true);
  }
  
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 40,
      sortable: false,
    },
    {
      title: "Name",
      render: (rowData) => {
        const name = `${rowData?.firstName} ${rowData?.lastName}`;
        return name || "-"
      },
      width: 120,
    },
    {
      title: "Email",
      field: "officeEmail",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Phone Number",
      field: "mobileNumber",
      emptyValue: "-",
      width: 120,
    },
    {
      title: "Position",
      render: (rowData) => {
        const position = rowData?.position?.positionName;
        return position ? position : '-';
    },
      width: 120,
    },
    {
      title: "Action",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDeactivatedEmployee(rowData)}
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
        data={deactivateEmployee}
        title="In Active Employee"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize:"1rem",
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
      />
      
      {
        openDeactivatedModal && (
          <EditActivationEmployeeModal
            id={deactivatedEmployee?.id}
            open={openDeactivatedModal}
            handleCloseModal={handleCloseDeactivatedModal}
          />
        )
      }
    </>
  );
};

export default DeactivatedEmployee;
