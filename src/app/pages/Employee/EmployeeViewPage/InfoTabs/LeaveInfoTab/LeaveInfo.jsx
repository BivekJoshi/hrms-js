import React from "react";
import { useParams } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import { useGetEmployeeLeaveById } from "../../../../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../../../../hooks/leaveType/useLeaveType";
import "../../EmployProfile/Style/Style.css";
import { useGetUserControl } from "../../../../../hooks/auth/userControl/useUserControl";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { useGetEmployee } from "../../../../../hooks/employee/useEmployee";

const LeaveInfo = ({ isLoading, data, role }) => {
  const fullname = `${data?.firstName} ${data?.middleNam || ""}${
    data?.lastName
  }`;
  const { data: employeeData } = useGetEmployee();
  // const { id } = useParams();
  const { data: leaveData, isLoading: loadingLeave } = useGetEmployeeLeaveById(
    data?.id
  );
  const { data: leaveTypeData, isLoading: loadingLeaveType } =
    useGetLeaveType();
  // const { data: UserData, isLoading: loadingUser } = useGetUserControl();

  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData.leaveTypeId;
    const leaveType = leaveTypeData.find((leave) => leave.id === leaveTypeId);
    const name = `${leaveType.leaveName}`;
    return name;
  };
  const getUserName = (rowData) => {
    const confirmById = rowData?.confirmById;
    const user = employeeData?.find(
      (confirmBy) => confirmBy?.id === confirmById
    );

    if (user) {
      return `${user?.firstName} ${user?.lastName}`;
    }
    return "-";
  };

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
              // width: " 9rem",
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
  ];
  if (isLoading || loadingLeaveType || loadingLeave) return <>Loading</>;

  return (
    <>
      {/* <Grid container spacing={3}>
        <Grid item xs={4} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Leave Total
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "green",
                }}
              >
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
      {/* <CustomTable
        columns={columns}
        data={leaveData}
        title={"Leave Data of " + fullname}
        isLoading={loadingLeave}
      /> */}
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
