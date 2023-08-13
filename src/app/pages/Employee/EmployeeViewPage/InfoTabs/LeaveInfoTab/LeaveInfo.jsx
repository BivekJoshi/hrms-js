import MaterialTable from "@material-table/core";
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { useGetEmployeeLeaveById } from "../../../../../hooks/leave/useLeave";
import { useGetLeaveType } from "../../../../../hooks/leaveType/useLeaveType";
import "../../EmployProfile/Style/Style.css";
import DashboardCard from "../../../../../components/cards/Dashboard/DashboardCard";

const LeaveInfo = ({ isLoading }) => {
  const { id } = useParams();
  const { data: leaveData, isLoading: loadingLeave } = useGetEmployeeLeaveById(
    id
  );
  const {
    data: leaveTypeData,
    isLoading: loadingLeaveType,
  } = useGetLeaveType();

  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData.leaveTypeId;
    const leaveType = leaveTypeData.find((leave) => leave.id === leaveTypeId);
    const name = `${leaveType.leaveName}`;
    return name;
  };

  if (leaveData) {
    const pendingLeaves = leaveData.filter((item) => item.leaveStatus === 'PENDING');
   
    // console.log(pendingLeaves, "pendinggggggg");
    // return pendingLeaves;
  } else {
    // console.log("leaveData is undefined or null");
  }


  
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
      field: "confirmById",
      emptyValue: "-",
      width: 40,
    },
  ];
  if (isLoading || loadingLeaveType || loadingLeave) return <>Loading</>;

  return (
    <>
      <Grid container spacing={3}>
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
      </Grid>
      <MaterialTable
        style={{ padding: "1rem" }}
        columns={columns}
        data={leaveData}
        title=""
        isLoading={loadingLeave}
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
    </>
  );
};

export default LeaveInfo;
