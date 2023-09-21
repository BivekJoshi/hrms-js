import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useGetDeactivatedEmployee } from "../../../hooks/employee/DeactivateEmploye/useEmployee";
import { EditActivationEmployeeModal } from "../EmployeeDeactivationModal/EditDeactivationEmployeeModal";
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const DeactivatedEmployee = () => {
  const { data: deactivateEmployee, isLoading } = useGetDeactivatedEmployee();

  const [openDeactivatedModal, setOpenDeactivatedModal] = useState(false);
  const [deactivatedEmployee, setDeactivatedEmployee] = useState({});
  const handleCloseDeactivatedModal = () => setOpenDeactivatedModal(false);

  const handleDeactivatedEmployee = (rowData) => {
    setDeactivatedEmployee(rowData);
    setOpenDeactivatedModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: "3%",
      maxWidth: "50px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Name",
      render: (rowData) => {
        const name = `${rowData?.firstName} ${rowData?.lastName}`;
        return name || "-";
      },
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: "Email",
      field: "officeEmail",
      emptyValue: "-",
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: "Phone Number",
      field: "mobileNumber",
      emptyValue: "-",
      // width: 120,
      sortable: false,
      sorting: false,
    },
    {
      title: "Position",
      render: (rowData) => {
        const position = rowData?.position?.positionName;
        return position ? position : "-";
      },
      // width: 120,
      sortable: false,
      sorting: false,
    },
  ];

  const actions = [
    {
      icon: () => (<RestoreFromTrashOutlinedIcon/>),
      tooltip: "Activate Employee",
      onClick: (event, rowData) => handleDeactivatedEmployee(rowData),
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
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
        actions={actions}
      />

      {openDeactivatedModal && (
        <EditActivationEmployeeModal
          id={deactivatedEmployee?.id}
          open={openDeactivatedModal}
          handleCloseModal={handleCloseDeactivatedModal}
        />
      )}
    </>
  );
};

export default DeactivatedEmployee;
