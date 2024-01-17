import * as React from "react";
import { useState } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  useDeleteLeaveAdmin,
  useGetleaveOfUser,
} from "../../hooks/leave/useLeave";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddLeaveModal, EditLeaveModal } from "./LeaveModal/LeaveModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import CustomTable from "../../components/CustomTable/CustomTable";
import PermissionHoc from "../../hoc/permissionHoc";
import useAuth from "../../../auth/hooks/component/login/useAuth";

const Leave = ({ permissions }) => {
  const { mode } = React.useContext(ThemeModeContext);
  const { isManager, isSuperAdmin } = useAuth();
  const { data: leaveData, isLoading: loading } = useGetleaveOfUser();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedLeave, setEditedLeave] = useState({});
  const [deletedLeave, setDeletedLeave] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLeaveMutation = useDeleteLeaveAdmin({});
  const handleDeleteLeave = (rowData) => {
    setDeletedLeave(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveMutation.mutate(deletedLeave?.leaveId);
    setOpenDeleteModal(false);
  };

  const handleEditLeave = (rowData) => {
    setEditedLeave(rowData);
    setOpenEditModal(true);
  };

  const pendingLeavesEmp =
    leaveData && leaveData?.filter((item) => item?.leaveStatus === "PENDING");
  const pendingLeaves =
    pendingLeavesEmp && pendingLeavesEmp?.sort((a, b) => b.leaveId - a.leaveId); // it short pending leaves according to it latest created

  const approvedRejectedLeaves =
    leaveData && leaveData?.filter((item) => item?.leaveStatus !== "PENDING");

  const columns = [
    {
      title: "SN",
      field: "id",
      sortable: false,
      width: "10px",
      sorting: false,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: "Employee Name",
      field: "employeeName",
      width: "60px",
      sorting: false,
    },
    {
      title: "Leave Type",
      field: "leaveType",
      width: "60px",
      sorting: false,
    },
    {
      title: "From",
      field: "fromDate",
      width: "60px",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "To",
      field: "toDate",
      width: "60px",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Status",
      field: "leaveStatus",
      emptyValue: "-",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => {
        const status = rowData.leaveStatus.toLowerCase();
        let chipColor = "";

        if (status === "approved") {
          chipColor = "rgb(139, 214, 49)";
        } else if (status === "rejected") {
          chipColor = "rgb(255, 79, 79)";
        } else if (status === "pending") {
          chipColor = "rgb(255, 126, 71)";
        }

        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            style={{
              backgroundColor: chipColor,
              color: "white",
              width: "6rem",
            }}
          />
        );
      },
      sorting: false,
    },
    {
      title: "Leave Reason",
      field: "leaveReason",
      width: "15%",
      emptyValue: "-",
      render: (rowData) => {
        return (
          <Typography
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {rowData?.leaveReason}
          </Typography>
        );
      },
    },
  ].filter(Boolean);

  const columnsApprovedRejected = [
    {
      title: "SN",
      field: "id",
      sortable: false,
      width: "10px",
      sorting: false,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: "Employee Name",
      field: "employeeName",
      width: "60px",
      sorting: false,
    },
    {
      title: "Leave Type",
      field: "leaveType",
      width: "60px",
      sorting: false,
    },
    {
      title: "From",
      field: "fromDate",
      width: "60px",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "To",
      field: "toDate",
      width: "60px",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Status",
      field: "leaveStatus",
      emptyValue: "-",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => {
        const status = rowData.leaveStatus.toLowerCase();
        let chipColor = "";

        if (status === "approved") {
          chipColor = "rgb(139, 214, 49)";
        } else if (status === "rejected") {
          chipColor = "rgb(255, 79, 79)";
        } else if (status === "pending") {
          chipColor = "rgb(255, 126, 71)";
        }

        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            style={{
              backgroundColor: chipColor,
              color: "white",
              width: "6rem",
            }}
          />
        );
      },
      sorting: false,
    },
    {
      title: "Leave Reason",
      field: "leaveReason",
      width: "15%",
      emptyValue: "-",
      render: (rowData) => {
        return (
          <div
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {rowData?.leaveReason}
          </div>
        );
      },
    },
    {
      title: "Remarks",
      field: "leaveRemarks",
      width: "15%",
      emptyValue: "-",
      render: (rowData) => {
        return (
          <div
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {rowData?.leaveRemarks}
          </div>
        );
      },
    },
    {
      title: "Approved By",
      width: "80px",
      sorting: false,
      field: "approvedBy",
      render: (rowData) => {
        if (rowData?.leaveStatus === "APPROVED") {
          return <Typography>{rowData.approvedBy}</Typography>;
        }
        return "-";
      },
    },
    {
      title: "Rejected By",
      width: "80px",
      sorting: false,
      field: "approvedBy",
      render: (rowData) => {
        if (rowData?.leaveStatus === "REJECTED") {
          return <Typography>{rowData?.approvedBy}</Typography>;
        }
        return "-";
      },
    },
  ].filter(Boolean);

  const actions = (isManager || isSuperAdmin) && [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      tooltip: "Edit Leave",
      onClick: (event, rowData) => handleEditLeave(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "red",
            },
          }}
        />
      ),
      tooltip: "Delete Leave",
      onClick: (event, rowData) => handleDeleteLeave(rowData),
    },
  ];
  // if (isLoading || loadingemployee || loadingleaveType) return <>Loading</>;

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleAddOpenModal}
          sx={{ textTransform: "none" }}
        >
          Add Leave
        </Button>
      </Box>

      <Box
        gap={2}
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {pendingLeaves && pendingLeaves.length > 0 && (
          <CustomTable
            columns={columns}
            data={pendingLeaves}
            title="Pending Leave Data"
            actions={actions}
            isLoading={loading}
          />
        )}

        {approvedRejectedLeaves && approvedRejectedLeaves.length > 0 && (
          <CustomTable
            columns={columnsApprovedRejected}
            data={approvedRejectedLeaves}
            title="Approved/Rejected Leave Data"
            isLoading={loading}
          />
        )}
      </Box>

      {openEditModal && (
        <EditLeaveModal
          data={editedLeave}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
          title={"Edit Leave"}
        />
      )}
      {openAddModal && (
        <AddLeaveModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={"Apply Leave"}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Leave"}
        />
      )}
    </Grid>
  );
};

export default PermissionHoc(Leave);
