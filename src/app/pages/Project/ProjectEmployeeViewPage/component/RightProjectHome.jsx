import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

export const RightProjectHome = (props) => {
  const projectData = [
    {
      projectName: "Human Resource Management System",
      TeamSize: "Team Size: 30s",
      StartDate: "2027-09-19",
      EndDate: "2027-09-19",
      projectInfo: "This is for the Project Information Project Information",
      Status: "all done",
    },
    {
      projectName: "Human Resource Management System",
      TeamSize: "Team Size: 30s",
      StartDate: "2027-09-19",
      EndDate: "2027-09-19",
      projectInfo: "This is for the Project Information Project Information",
      Status: "all done",
    },
    {
      projectName: "Human Resource Management System",
      TeamSize: "Team Size: 30s",
      StartDate: "2027-09-19",
      EndDate: "2027-09-19",
      projectInfo: "This is for the Project Information Project Information",
      Status: "all done",
    },
  ];
  const progress = 5 * 100;

  return (
    <Box display="grid" gap="1rem">
      <h3>Project</h3>

      {projectData.map((data, index) => (
        <Box bgcolor="#ededed66" padding="1rem" boxShadow="5">
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography fontSize="1.2rem" fontWeight="600">
              {data.projectName}
            </Typography>
            <Chip label={data.Status} />
          </Box>

          <Typography>{data.TeamSize}</Typography>
          <Box display="flex" flexDirection="row" gap="1rem">
            <Typography>Start Data :{data.StartDate} </Typography>
            <Typography>End Data :{data.EndDate} </Typography>
          </Box>
          <Typography>{data.projectInfo}</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ))}
    </Box>
  );
};
