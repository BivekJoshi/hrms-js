import { Box } from "@mui/system";
import React, { useContext } from "react";
import "../../Style/Style.css";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import { Divider, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";

export const RightEmployDashbord = (props) => {
  const navigate = useNavigate();
  const { data: leavebalance, isLoading } = useGetLoggedInUserLeaveBalance();

  // const sumOfLeaveTaken = leavebalance?.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue?.leaveTaken;
  // }, 0);

  // const sumOfLeaveBalance = leavebalance.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue.leaveBalance;
  // }, 0);
  // const avegLeaveBalance=sumOfLeaveBalance/leavebalance.length;
  const sumOfLeaveTaken=0;
  const avegLeaveBalance=0;


  const { mode } = useContext(ThemeModeContext);
  return (
    <Box>
      <Box>
        <h3>Project</h3>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="1rem"
        >
          <Box
            className={
              mode === "light"
                ? "employeeDeshbordBG employeeDeshbord"
                : "employeeDeshbordBGDark employeeDeshbord"
            }
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <h4>WORKING ON</h4>
              HRMS
            </Box>
            <Divider sx={{ border: "1px solid black" }} />
            <Box>
              <h4>OTHER PROJECT</h4>
              HRMS
            </Box>
          </Box>
          <Box alignSelf="center" paddingTop="2rem">
            <h4> Total Project</h4>
            <Typography textAlign="center">6</Typography>
          </Box>
        </Box>
      </Box>
      <Box marginTop="1rem">
        <h3>Your Leaves</h3>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="1rem"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
            <Typography>{sumOfLeaveTaken}</Typography>LEAVE TAKEN
            </Box>
            <Divider sx={{ border: "1px solid black" }} />
            <Box alignSelf="center">
              <Typography>{avegLeaveBalance}</Typography> REMAINING
            </Box>
          </Box>
          <Box alignSelf="center" paddingTop="2rem">
            <ButtonComponent
              buttonName={"APPLY Leave"}
              OnClick={() => {
                navigate("/employee/applyleave");
              }}
              BGColor={"orange"}
              TextColor={"black"}
            />
          </Box>
        </Box>
      </Box>
      <Box margin="1rem 0">
        <h3 style={{margin:"1rem 0"}}>UPCOMMING HOLIDAY</h3>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          padding="1rem"
        >
          <Typography fontWeight="600" textAlign="center">
            MONDAY 10 JULY, 2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
