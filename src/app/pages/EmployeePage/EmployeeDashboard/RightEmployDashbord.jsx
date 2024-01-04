import { Box } from "@mui/system";
import React, { useContext } from "react";
import "../../Style/Style.css";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import { Grid, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";
import ToDoList from "../Component/ToDoList";

export const RightEmployDashbord = ({ employData }) => {
  const navigate = useNavigate();
  const { data: leavebalance } = useGetLoggedInUserLeaveBalance();

  const sumOfLeaveTaken = Array.isArray(leavebalance)
    ? leavebalance?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue?.leaveTaken;
      }, 0)
    : "";

  const sumOfLeaveBalance = Array.isArray(leavebalance)
    ? leavebalance.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.leaveBalance;
      }, 0)
    : "";

  const { mode } = useContext(ThemeModeContext);
  return (
    <Box>
      <Box>
        <Typography variant="h5">Your Leaves</Typography>
        <Box
          className={
            mode === "light"
              ? " employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          display="flex"
          marginTop="1rem"
          flexDirection="column"
          justifyContent="center"
          padding={{ sm: " 1rem ", md: "0", lg: "1rem" }}
          flexWrap="wrap"
          borderRadius="10px"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Card
              bgcolor={mode === "light" ? "#D6EBFF" : "#0F6FA6"}
              leaveName={"Annual Leaves"}
            />
            <Card
              bgcolor={mode === "light" ? "#FFDAD5" : "#E53935"}
              leaveName={"Leave Taken"}
              leavetaken={sumOfLeaveTaken}
            />
            <Card
              bgcolor={mode === "light" ? "#ECFFE3" : "#388E3C"}
              leaveName={"Remaining"}
              leavetaken={sumOfLeaveBalance}
            />
          </Box>
          <Box alignSelf="center">
            <ButtonComponent
              buttonName={"Apply Leave"}
              OnClick={() => {
                navigate("/employee/applyleavefield");
              }}
            />
          </Box>
        </Box>
      </Box>
      <Grid>
        <ToDoList />
      </Grid>
    </Box>
  );
};

export const Card = ({ bgcolor, leaveName, leavetaken }) => {
  return (
    <Grid
      bgcolor={bgcolor}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="150px"
      borderRadius="8px"
    >
      <Typography
        alignSelf="center"
        fontSize={{ sm: "22px", md: "18px", lg: "22px" }}
      >
        {leaveName === "Annual Leaves" ? "3/12" : leavetaken + " Days"}
      </Typography>
      <Typography
        fontSize={{ xs: "11px", sm: "14px", md: "12px", lg: "14px" }}
        alignSelf="center"
      >
        {leaveName}
      </Typography>
    </Grid>
  );
};
