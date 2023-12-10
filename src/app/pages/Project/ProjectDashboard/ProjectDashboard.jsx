import { Box } from "@mui/material";
import React from "react";
import ProjectProgresscard from "./Component/ProjectProgresscard";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ProjectPiChart } from "./Component/ProjectPiChart";
import { EmploytaskBarGraph } from "./Component/EmploytaskBarGraph";

export const ProjectDashboard = (props) => {
  const projectProgress = [
    {
      name: "Planning",
      progress: "100%",
      icon: <PsychologyAltIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      name: "Design",
      progress: "100%",
      icon: <DesignServicesIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      name: "Development",
      progress: "80%",
      icon: <DeveloperModeIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      name: "Testig",
      progress: "60%",
      icon: <BugReportIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
  ];
  const taskStatusColors = ["#F65E3C", "#A1E000", "#9137B8", "#D93084"];
  const taskPriorityColors = ["#d54b4b", "#1c89d9", "#1cd94f", "#ddd909"];

  const taskStatus = [
    { nameOfTask: "Complete", numberOfTask: 1 },
    { nameOfTask: "Work in Progress", numberOfTask: 4 },
    { nameOfTask: "Pending", numberOfTask: 7 },
    { nameOfTask: "On Hold", numberOfTask: 8 },
  ];
  const taskPriority = [
    { nameOfTask: "High", numberOfTask: 8 },
    { nameOfTask: "Medium", numberOfTask: 6 },
    { nameOfTask: "Low", numberOfTask: 7 },
  ];

  return (
    <Box>
      <h3 style={{ marginTop: ".5rem" }}>HRMS</h3>
      <Box
        display="grid"
        grid
        gridTemplateColumns="repeat(auto-fit, minmax(125px, 1fr))"
        gap="1rem"
        padding="2rem 0 0"
      >
        {projectProgress.map((taskDetail, index) => (
          <ProjectProgresscard
            key={index}
            nameOfTask={taskDetail.name}
            numberOfTask={taskDetail.progress}
            icon={taskDetail.icon}
          />
        ))}
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px,1fr))"
        gap="2rem"
        paddingTop="4rem"
      >
        <Box>
          <h4>Task Status</h4>
          <ProjectPiChart task={taskStatus} COLORS={taskStatusColors}/>
        </Box>
        <Box>
          <h4>Task Priority</h4>
          <ProjectPiChart task={taskPriority} COLORS={taskPriorityColors}/>
        </Box>
        <Box  height="100%" >
          <h4 style={{margin:"0 0 -100px 0px"}}>Employee Progress</h4>
          <EmploytaskBarGraph />
        </Box>
      </Box>
    </Box>
  );
};
