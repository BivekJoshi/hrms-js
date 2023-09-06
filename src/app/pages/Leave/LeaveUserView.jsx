import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useDeleteLeave, useGetLoggedInUserLeave } from "../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../hooks/leaveType/useLeaveType";
import { Button, Chip, Stack } from "@mui/material";
import { useGetUserControl } from "../../hooks/auth/userControl/useUserControl";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from "react-router-dom";
import ApplyLeaveField from "../../components/Form/Leave/ApplyLeave/ApplyLeaveField";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const LeaveUserView = () => {
  const navigate = useNavigate();
  const { data: leaveData, isLoading } = useGetLoggedInUserLeave();
  const {
    data: leaveTypeData,
    isLoading: loadingLeaveType,
  } = useGetLeaveType();
  const [deletedLeave, setDeletedLeave] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteLeaveMutation = useDeleteLeave({});
  const handleDeleteLeave = (rowData) => {
    setDeletedLeave(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveMutation.mutate(deletedLeave.id);
    setOpenDeleteModal(false);
  };

  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData?.leaveTypeId;
    const leaveType = leaveTypeData?.find((leave) => leave?.id === leaveTypeId);
    const name = `${leaveType?.leaveName}`;
    return name;
  };
  const { data: UserData, isLoading: loadingUser } = useGetUserControl();
  const getUserName = (rowData) => {
    const confirmById = rowData?.confirmById;
    const user = UserData?.find((confirmBy) => confirmBy.id === confirmById);
    const name = `${user?.name || "-"}`;
    return name;
  };
  const handleEditLeave = (rowData) => {
    navigate(`/employee/applyleavefield`,{ state: { rowData } });
  };
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
    },
    {
      title: "Leave Type",
      render: (rowData) => {
        return <p>{getLeaveTypeName(rowData)}</p>;
      },
      width: 150,
    },
    {
      title: "From",
      field: "fromDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "To",
      field: "toDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Status",
      field: "leaveStatus",
      emptyValue: "-",
      width: 100,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => {
        const status = rowData.leaveStatus;
        let chipColor = "";

        if (status === "APPROVED") {
          chipColor = "green";
        } else if (status === "REJECTED") {
          chipColor = "red";
        } else if (status === "PENDING") {
          chipColor = "orange";
        }

        return (
          <Chip
            label={status}
            style={{
              backgroundColor: chipColor,
              color: "white",
              width: " 9rem",
            }}
          />
        );
      },
    },
    {
      title: "Approved By",
      render: (rowData) => {
        return <p>{getUserName(rowData)} </p>;
      },
      width: 120,
    },
    {
      title: "Remarks",
      field: "leaveRemarks",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Actions",
      render: (rowData) => {
        const isApprovedOrRejected = ["APPROVED", "REJECTED"].includes(
          rowData.leaveStatus
        );

        return (
          <Stack direction="row" spacing={0}>
            <Button
              color="primary"
              onClick={() => handleEditLeave(rowData)}
              disabled={isApprovedOrRejected}
            >
              <ModeEditOutlineIcon />
            </Button>
            <Button color="primary" onClick={() => handleDeleteLeave(rowData)}>
              <DeleteIcon />
            </Button>
          </Stack>
        );
      },
      sorting: false,
      width: 120,
    },
  ];
  return (
    <>
      <MaterialTable
        style={{ padding: "1rem" }}
        columns={columns}
        data={leaveData}
        title={"Leave History"}
        //   isLoading={loadingLeave}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            width: "150px",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
      />
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(false)}
          handleConfirmDelete={handleConfirmDelete}
          message={"Leave"}
        />
      )}
    </>
  );
};

export default LeaveUserView;
