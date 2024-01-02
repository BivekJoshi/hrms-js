import React from "react";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import { useGetEmployeeLeaveById } from "../../../../../hooks/leave/useLeave";
import "../../EmployProfile/Style/Style.css";
import CustomTable from "../../../../../components/CustomTable/CustomTable";

const LeaveInfo = ({ isLoading, data }) => {
  const fullname = `${data?.firstName} ${data?.middleNam || ""}${
    data?.lastName
  }`;

  const { id } = useParams();
  const { data: leaveData, isLoading: loadingLeave } =
    useGetEmployeeLeaveById(id);

  if (leaveData) {
    const pendingLeaves = leaveData.filter(
      (item) => item.leaveStatus === "PENDING"
    );
  }

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
        return <p>{rowData.leaveType.leaveName}</p>;
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
        return <p>{rowData.confirmBy.name} </p>;
      },
      width: 120,
    },
  ];
  if (loadingLeave) return <>Loading</>;

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
      <CustomTable
        columns={columns}
        data={leaveData}
        title={"Leave Data of " + fullname}
        isLoading={loadingLeave}
      />
    </>
  );
};

export default LeaveInfo;
