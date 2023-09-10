import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

export const RightProjectHome = (props) => {
  const projectData = [
    {
      projectName: "Human Resource Management System",
      TeamSize: "30",
      StartDate: "2027-09-19",
      EndDate: "2027-09-19",
      projectInfo: "This is for the Project Information Project Information",
      Status: "all done",
    },
    {
      projectName: "Human Resource Management System",
      TeamSize: "30",
      StartDate: "2027-09-19",
      EndDate: "2027-09-19",
      projectInfo: "This is for the Project Information Project Information",
      Status: "all done",
    },
    {
      projectName: "Human Resource Management System",
      TeamSize: "30",
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
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h4 style={{color:"#01579b", fontSize:".95rem"}}>{data.projectName}</h4>
            <Chip
              label={data.Status}
              sx={{ height: "16px", fontSize: ".7rem" }}
            />
          </Box>

          <Typography fontSize=".8rem">Team Size: {data.TeamSize}</Typography>
          <Box display="flex" flexDirection="row" gap="1rem">
            <Typography fontSize=".8rem">
              Start Data :{data.StartDate}{" "}
            </Typography>
            <Typography fontSize=".8rem">End Data :{data.EndDate} </Typography>
          </Box>
          <Typography fontSize=".8rem">{data.projectInfo}</Typography>
          {/* <LinearProgress variant="determinate" value={progress} /> */}
        </Box>
      ))}
    </Box>
  );
};
