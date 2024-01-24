import React from "react";
import { useParams } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";
import {
  useGetEmployeeLeaveById,
  useGetLoggedInUserLeave,
} from "../../../../../hooks/leave/useLeave";
import "../../EmployProfile/Style/Style.css";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";

const LeaveInfo = ({ isLoading, data, role }) => {
  const fullname = `${data?.firstName} ${data?.middleNam || ""}${
    data?.lastName
  }`;
  const { isEmployee } = useAuth();
  const { id } = useParams();
  const { data: leaveData, isLoading: loadingLeave } = isEmployee
    ? useGetLoggedInUserLeave()
    : useGetEmployeeLeaveById(id);

  // if (leaveData) {
  //   const pendingLeaves = leaveData.filter(
  //     (item) => item.leaveStatus === "PENDING"
  //   );
  // }
  const pendingLeaves =
    leaveData && leaveData.filter((item) => item?.leaveStatus === "PENDING");
  const approvedRejectedLeaves =
    leaveData && leaveData.filter((item) => item?.leaveStatus !== "PENDING");

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      // width: 80,
      maxWidth:"8px",
      sortable: false,
    },
    {
      title: "Leave Type",
      render: (rowData) => {
        return `${rowData.leaveType.leaveName}`;
      },
      width: 100,
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
              display: 'flex',
              textAlign: 'center'
              // width: " 6rem",
            }}
          />
        );
      },
    },
    // {
    //   title: "Approved By",
    //   render: (rowData) => {
    //     return <p>{rowData?.confirmBy?.name || ""} </p>;
    //   },
    //   width: 120,
    // },
    {
      title: "Approved By",
      width: "80px",
      sorting: false,
      field: "approvedBy",
      render: (rowData) => {
        if (rowData?.leaveStatus === "APPROVED") {
          return <Typography>{rowData?.confirmBy?.name}</Typography>;
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
          return <Typography>{rowData?.confirmBy?.name}</Typography>;
        }
        return "-";
      },
    },
  ].filter(Boolean);
  if (loadingLeave) return <>Loading</>;

  return (
    <>
      <Box
        gap={2}
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {pendingLeaves && pendingLeaves.length > 0 && (
          <CustomTable
            columns={columns}
            data={pendingLeaves}
            title="Pending Leave Data"
          />
        )}

        {approvedRejectedLeaves && approvedRejectedLeaves.length > 0 && (
          <CustomTable
            columns={columns}
            data={approvedRejectedLeaves}
            title="Approved/Rejected Leave Data"
          />
        )}
      </Box>
    </>
  );
};

export default LeaveInfo;
