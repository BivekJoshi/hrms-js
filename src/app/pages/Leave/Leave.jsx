import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  useDeleteLeave,
  useDeleteLeaveAdmin,
  useGetLeave,
  useGetleaveOfUser,
} from "../../hooks/leave/useLeave";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddLeaveModal, EditLeaveModal } from "./LeaveModal/LeaveModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import CustomTable from "../../components/CustomTable/CustomTable";
import { toast } from "react-toastify";
import { useLeaveDataSearch } from "./Api/LeaveApi";
import HocButton from "../../hoc/hocButton";
import PermissionHoc from "../../hoc/permissionHoc";

const Leave = ({ permissions }) => {
  const { mode } = React.useContext(ThemeModeContext);
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

  const pendingLeaves =
    leaveData && leaveData.filter((item) => item?.leaveStatus === "PENDING");
  const approvedRejectedLeaves =
    leaveData && leaveData.filter((item) => item?.leaveStatus !== "PENDING");

  const columns = [
    {
      title: "SN",
      field: "id",
      sortable: false,
      width: '10px',
      sorting: false,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: "Employee Name",
      field: "employeeName",
      width: '60px',
      sorting: false,
    },
    {
      title: "Leave Type",
      field: "leaveType",
      width: '60px',
      sorting: false,
    },
    {
      title: "From",
      field: "fromDate",
      width: '60px',
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "To",
      field: "toDate",
      width: '60px',
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
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            sx={{
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
          <div style={{whiteSpace: 'wrap'}}>
            {rowData?.leaveReason}
          </div>
        );
      },
    },
  ].filter(Boolean);

  const columnsApprovedRejected=[
    {
      title: "SN",
      field: "id",
      sortable: false,
      width: '10px',
      sorting: false,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: "Employee Name",
      field: "employeeName",
      width: '60px',
      sorting: false,
    },
    {
      title: "Leave Type",
      field: "leaveType",
      width: '60px',
      sorting: false,
    },
    {
      title: "From",
      field: "fromDate",
      width: '60px',
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "To",
      field: "toDate",
      width: '60px',
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
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            sx={{
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
      width: "120px",
      emptyValue: "-",
      render: (rowData) => {
        return (
          <div style={{whiteSpace: 'normal'}}>
            {rowData?.leaveReason}
          </div>
        );
      },
    },
    {
      title: "Remarks",
      field: "leaveRemarks",
      width: "120px",
      emptyValue: "-",
      render: (rowData) => {
        return (
          <div style={{whiteSpace: 'normal'}}>
            {rowData?.leaveRemarks}
          </div>
          // <Tooltip title={rowData?.leaveRemarks} placement="top-start" arrow>
          //   <Chip
          //     style={{
          //       cursor: "pointer",
          //       width: "240px",
          //       display: "block",
          //       background: mode === "light" ? "white" : "#434343",
          //     }}
          //     label={
          //       <Typography
          //         style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          //       >
          //         {rowData?.leaveRemarks}
          //       </Typography>
          //     }
          //   />
          // </Tooltip>
        );
      },
    },

    {
      title: "Approved By",
      width: "80px",
      sorting: false,
      field: "approvedBy",
    },
  ].filter(Boolean);
  const actions = [
    {
      icon: () => <ModeEditOutlineIcon />,
      tooltip: "Edit Leave",
      onClick: (event, rowData) => handleEditLeave(rowData),
    },
    {
      icon: () => <DeleteIcon />,
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
        <ButtonComponent
          OnClick={handleAddOpenModal}
          Border="none"
          color={"#fff"}
          buttonName={"+ Add Leave"}
        />
      </Box>

      <Box
        gap={2}
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {pendingLeaves && pendingLeaves.length > 0 && (
          <CustomTable
            columns={columns}
            data={pendingLeaves}
            title="Pending Leave Data "
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
