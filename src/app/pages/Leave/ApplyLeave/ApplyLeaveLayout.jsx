import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApplyLeave from "./ApplyLeave";
import { Chip, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LeaveUserView from "../LeaveUserView";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetLoggedInUserLeave } from '../../../hooks/leave/useLeave';

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
  const { data: leaveData, isLoading } = useGetLoggedInUserLeave();
  const navigate = useNavigate();

  const{mode} =React.useContext(ThemeModeContext);

  const pendingLeaveData = leaveData && leaveData.filter(leaveRecord => leaveRecord?.leaveStatus === "PENDING");
// console.log(pendingLeaveData)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item style={{ textAlign: "center" }}>
            <Typography variant="h5">{formattedDate}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <ApplyLeave />
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Box
              borderLeft="6px solid green"
              paddingLeft="10"
              backgroundColor={mode === "light" ? "#efeeeb" : "#4f4e4c"}
              padding=".5rem"
            >
              <Typography fontSize="1.2rem">
                <b>Your Leave Request</b>
              </Typography>
              <Grid container spacing={2} paddingTop=".5rem">
                <Grid item xs={5}>
                  <Typography variant="h7" fontWeight="bold">
                    From Date
                  </Typography>
                  <br />
                  <Typography variant="h7" fontWeight="bold">
                    {pendingLeaveData?.fromDate}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h7" fontWeight="bold">
                    To Date
                  </Typography>
                  <br />
                  <Typography variant="h7" fontWeight="bold">
                  {pendingLeaveData?.toDate}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip label={pendingLeaveData?.leaveStatus} sx={{ fontSize: ".7rem" }} />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <LeaveUserView data={leaveData} />
      </Grid>
      <Fab
        color="secondary"
        aria-label="add"
        style={fabStyle}
        onClick={() => navigate(`/employee/applyleavefield`)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ApplyLeaveLayout;
