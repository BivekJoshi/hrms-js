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
  const { data: leavebalance, isLoading } = useGetLoggedInUserLeaveBalance();
  const { data: resourceLogInUser } = uselogInEemployeeResource(
    employData?.employeeId
  );
  const { data: officeresource } = useGetOfficeResource();

  const getResourceName = () => {
    const resourceId = resourceLogInUser?.map((res) => res.officeResourceId);
    const resourceName = officeresource?.find(
      (resource) => resource?.id === resourceId[0]
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
      <Box className="taskTable">
        <h3>Pending Task</h3>
        <Box margin="1rem 0">
          <PendingTask />
        </Box>
      </Box>
      <Box>
        <h3>Your Leaves</h3>
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
          padding="0.5rem 1rem"
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
                navigate("/employee/applyleavefield");
              }}
              BGColor={"orange"}
              TextColor={"black"}
            />
          </Box>
        </Box>
      </Box>
      <Box margin="1rem 0">
        <h3 style={{ margin: "1rem 0" }}>Logistic Used</h3>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          padding="1rem"
        >
          <Typography fontWeight="600" textAlign="center">
            {getResourceName()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
