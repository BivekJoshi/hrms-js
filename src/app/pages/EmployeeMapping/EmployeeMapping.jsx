import React, { useState } from "react";
import { useGetEmployeeDeviceMappingById } from "../../hooks/EmployeeMapping/useEmployeeMapping";
import CustomTable from "../../components/CustomTable/CustomTable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditDataModal from "./Component/EditDataModal";

const EmployeeMapping = () => {
  const { data: mapeData, isLoading } = useGetEmployeeDeviceMappingById();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleEditData = (rowData) => {
    setEditedData(rowData);
    setOpenEditModal(true);
  };
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee Name",
      field: "firstName",
      width: "20vh",
      sorting: false,
      render: (rowData) => {
        return (
          <Typography>
            {rowData?.firstName} {rowData?.middleName || ""} {rowData?.lastName}
          </Typography>
        );
      },
    },
    {
      title: "Device Branch Id",
      field: "deviceBranchId",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Device Employee Id",
      field: "deviceEmpId",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Contact",
      field: "mobileNumber",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Email",
      field: "officeEmail",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Date Of Join",
      field: "dateOfJoin",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Date Of Birth",
      field: "dateOfBirth",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Shift Type",
      field: "shiftType",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Active",
      //   field: "isActive ",
      width: "10vh",
      render: (rowData) => {
        return (
          <Typography textAlign="center">
            {/* {rowData?.deviceEmpId && rowData?.deviceBranchId ? ( */}
            {rowData?.isActive ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              <CancelIcon sx={{ color: "red" }} />
            )}
          </Typography>
        );
      },
    },
  ];

  const actions = [
    (rowData) => ({
      icon: () => (
        <IconButton
          //   permissions={permissions?.canEdit}
          disabled={rowData.deviceEmpId && rowData.deviceBranchId}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
      tooltip: "Edit Branch Id And Employee Id",
      onClick: (event, rowData) =>
        rowData.deviceEmpId && rowData.deviceBranchId
          ? ""
          : handleEditData(rowData),
    }),
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={mapeData}
        title="Branch List"
        isLoading={isLoading}
        exportButton={true}
        actions={actions}
      />
      {openEditModal && (
        <EditDataModal
          title={"Edit Company"}
          data={editedData}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default EmployeeMapping;
