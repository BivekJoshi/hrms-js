import { Box } from "@mui/system";
import React, { useContext } from "react";
import "../../Style/Style.css";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import { Divider, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUserLeaveBalance } from "../../../hooks/leave/useLeave";
import { uselogInEemployeeResource } from "../../../hooks/resource/employeeResource/useEmployeeResource";
import { useGetOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { PendingTask } from "../Component/PendingTask";

export const RightEmployDashbord = ({ employData }) => {
  const navigate = useNavigate();
  const { data: leavebalance } = useGetLoggedInUserLeaveBalance();
  const { data: resourceLogInUser } = uselogInEemployeeResource(
    employData?.employeeId
  );
  const { data: officeresource } = useGetOfficeResource();

  const getResourceName = (logistic) => {
    const resourceName = officeresource?.find(
      (resource) => resource?.id === logistic
    );
    return resourceName?.name;
  };
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
  const avegLeaveBalance = Array.isArray(leavebalance)
    ? sumOfLeaveBalance / leavebalance.length
    : "";

  const { mode } = useContext(ThemeModeContext);
  return (
    <Box>
      {/* <Box className="taskTable">
        <h3>Pending Task</h3>
        <Box margin="1rem 0">
          <PendingTask />
        </Box>
      </Box> */}
      <Box>
        <Typography variant="h5">Your Leaves</Typography>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          display="flex"
          marginTop="1rem"
          flexDirection="column"
          justifyContent="center"
          padding=" 1rem"
          boxShadow="7"
          borderRadius="10px"
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
            />
          </Box>
        </Box>
      </Box>
      {resourceLogInUser && (
        <Box margin="1rem 0">
          <Typography variant="h5" style={{ margin: "1rem 0" }}>Logistic Used</Typography>
          <Box
            className={
              mode === "light"
                ? "employeeDeshbordBG employeeDeshbord"
                : "employeeDeshbordBGDark employeeDeshbord"
            }
            padding="1rem"
            maxHeight="10rem"
            overflow="auto"
            boxShadow="7"
            borderRadius="10px"
          >
            {Array.isArray(resourceLogInUser)
              ? resourceLogInUser.map((logistic) => (
                  <Typography
                    fontWeight="600"
                    textAlign="center"
                    key={logistic.id}
                  >
                    {getResourceName(logistic?.officeResourceId)}
                  </Typography>
                ))
              : ""}
          </Box>
        </Box>
      )}
    </Box>
  );
};
