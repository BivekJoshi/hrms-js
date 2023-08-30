import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApplyLeave from "./ApplyLeave";
import { Chip, Fab, Typography } from "@mui/material";
import LeaveInfo from "../../Employee/EmployeeViewPage/InfoTabs/LeaveInfoTab/LeaveInfo";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const fabStyle = {
  position: "fixed",
  bottom: 20,
  right: 20,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

const today = new Date();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayWithOrdinal = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

const formattedDate = `${dayWithOrdinal(today.getDate())} ${
  months[today.getMonth()]
} ${today.getFullYear()}`;

const ApplyLeaveLayout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item style={{ textAlign: "center" }}>
            <h2>{formattedDate}</h2>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <ApplyLeave />
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Box
              style={{
                minHeight: 100,
                borderLeft: "6px solid green",
                paddingLeft: 10,
                backgroundColor:'#efeeeb'
              }}
            >
              <Typography variant="h6">
                <b>Your Leave Request</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Typography variant="h5">From Date</Typography>
                  <Typography variant="h6">2023-03-04</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h5">To Date</Typography>
                  <Typography variant="h6">2023-03-19</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip label="Rejected" />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
      <br/>
      <Grid item xs={12}>
        <LeaveInfo />
      </Grid>
      <Fab color="secondary" aria-label="add" style={fabStyle} onClick={() => navigate(`/employee/applyleavefield`)}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ApplyLeaveLayout;
