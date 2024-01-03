import React, { useContext, useState } from "react";
import {
  useDeleteLeave,
  useGetLoggedInUserLeave,
} from "../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../hooks/leaveType/useLeaveType";
import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { useGetUserControl } from "../../hooks/auth/userControl/useUserControl";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from "react-router-dom";
import ApplyLeaveField from "../../components/Form/Leave/ApplyLeave/ApplyLeaveField";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import CustomTable from "../../components/CustomTable/CustomTable";

const halfLeaveType = [
  {
    id: 1,
    label: "First Half",
    value: "FIRST_HALF",
  },
  {
    id: 1,
    label: "Second Half",
    value: "SECOND_HALF",
  },
];
const LeaveUserView = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const leaveData = data;
  const [deletedLeave, setDeletedLeave] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mode } = useContext(ThemeModeContext);
  const deleteLeaveMutation = useDeleteLeave({});
  const handleDeleteLeave = (rowData) => {
    setDeletedLeave(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveMutation.mutate(deletedLeave.id);
    setOpenDeleteModal(false);
  };

  const halfLeaveTypeName = (rowData) => {
    const halfLeaveType = rowData?.halfLeaveType;
    const fromDate = new Date(rowData?.fromDate);
    const toDate = new Date(rowData?.toDate);
    const daysDifference =
      Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

    if (halfLeaveType === "FIRST_HALF") {
      return "First Half";
    } else if (halfLeaveType === "SECOND_HALF") {
      return "Second Half";
    } else if (daysDifference > 1) {
      return `${daysDifference} days`;
    } else {
      return "1 day";
    }
  };

  const handleEditLeave = (rowData) => {
    navigate(`/employee/applyleavefield`, { state: { rowData } });
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: 20,
      sortable: false,
    },
    {
      title: "Leave Type",
      field: "leaveType.leaveName",
      width: 60,
    },
    {
      title: "From",
      field: "fromDate",
      emptyValue: "-",
      width: 80,
    },
    {
      title: "To",
      field: "toDate",
      emptyValue: "-",
      width: 80,
    },
    {
      title: "Half Leave Type",
      render: (rowData) => {
        return <p>{halfLeaveTypeName(rowData)}</p>;
      },
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
              maxWidth: " fit-content",
            }}
          />
        );
      },
    },
    {
      title: "Approved By",
      field: "confirmBy.name",
      width: 120,
    },
    {
      title: "Reason",
      field: "leaveReason",
      emptyValue: "-",
      cellStyle: {
        whiteSpace: "nowrap", // Prevent text from wrapping
        overflow: "hidden",
        textOverflow: "ellipsis", // Add ellipsis for overflowed text
        maxWidth: 200, // Adjust this value to control the maximum width before the text becomes ellipsized
        verticalAlign: "middle", // Center vertically
      },
      render: (rowData) => {
        return (
          <Tooltip title={rowData?.leaveReason} placement="top-start" arrow>
            <Chip
              style={{
                cursor: "pointer",
                width: "200px",
                height: "50px",
                display: "block",
                background: mode === "light" ? "white" : "#434343",
              }}
              label={
                <Typography
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {rowData?.leaveReason}
                </Typography>
              }
            />
          </Tooltip>
        );
      },
    },
    // {
    //   title: "Actions",
    //   render: (rowData) => {
    //     const isApprovedOrRejected = ["APPROVED", "REJECTED"].includes(
    //       rowData.leaveStatus
    //     );

    //     return (
    //       <Stack direction="row" spacing={0}>
    //         <Button
    //           color="primary"
    //           onClick={() => handleEditLeave(rowData)}
    //           disabled={isApprovedOrRejected}
    //         >
    //           <ModeEditOutlineIcon />
    //         </Button>
    //         <Button
    //           color="primary"
    //           onClick={() => handleDeleteLeave(rowData)}
    //           disabled={isApprovedOrRejected}
    //         >
    //           <DeleteIcon />
    //         </Button>
    //       </Stack>
    //     );
    //   },
    //   sorting: false,
    //   width: 120,
    // },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={leaveData}
        title="Leave History"
        isLoading={isLoading}
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
