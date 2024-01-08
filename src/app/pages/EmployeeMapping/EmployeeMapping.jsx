import React, { useState } from "react";
import { useGetEmployeeDeviceMappingById } from "../../hooks/EmployeeMapping/useEmployeeMapping";
import CustomTable from "../../components/CustomTable/CustomTable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditDataModal from "./Component/EditDataModal";

const EmployeeMapping = () => {
  const { data: mapData, isLoading } = useGetEmployeeDeviceMappingById();
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
      title: "Employee Id",
      field: "deviceEmpId",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Employee Name",
      field: "firstName",
      width: "20vh",
      sorting: false,
      render: (rowData) => {
        return (
          <Typography textTransform="capitalize">
            {rowData?.firstName} {rowData?.middleName || ""} {rowData?.lastName}
          </Typography>
        );
      },
    },
    {
      title: "Branch Id",
      field: "deviceBranchId",
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
      title: "Contact",
      field: "mobileNumber",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Email",
      field: "officeEmail",
      render: (rowData) => {
        return (
          <Tooltip title={rowData.officeEmail} placement="top-start" arrow>
            <div
              style={{
                width: "10rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {rowData.officeEmail}
            </div>
          </Tooltip>
        );
      },
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
      title: "Map",
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
          sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }}
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
        data={mapData}
        title="Employee Mapping"
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
