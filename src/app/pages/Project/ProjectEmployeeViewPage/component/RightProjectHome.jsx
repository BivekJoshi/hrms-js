import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { useGetProjectByEmployeeIdInvolved } from "../../../../hooks/project/useProject";
import { useGetLoggedInUser } from "../../../../hooks/auth/usePassword";

export const RightProjectHome = (props) => {
  const {data:loggedInUserData}=useGetLoggedInUser();
  const employeeId=loggedInUserData?.employeeId;
  const {data:employeeInvolvedProject}=useGetProjectByEmployeeIdInvolved(employeeId);
  // console.log(employeeInvolvedProject,"Data hai ma chai ");
  
  const progress = 5 * 100;

  return (
    <Box display="grid" gap="1rem">
      <h3>Your Projects</h3>

      {employeeInvolvedProject?.map((data, index) => (
        <Box bgcolor="#ededed66" padding="1rem" boxShadow="5">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h4 style={{color:"#01579b", fontSize:".95rem"}}>{data.projectName}</h4>
            <Chip
              label={data.taskStatus}
              sx={{ height: "16px", fontSize: ".7rem" }}
            />
          </Box>

          <Typography fontSize=".8rem">Team Size: {data.TeamSize}</Typography>
          <Box display="flex" flexDirection="row" gap="1rem">
            <Typography fontSize=".8rem">
              Start Data :{data.startDate}{" "}
            </Typography>
            <Typography fontSize=".8rem">End Data :{data.endDate} </Typography>
          </Box>
          <Typography fontSize=".8rem">{data.projectInfo}</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ))}
    </Box>
  );
};
