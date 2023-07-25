import { Box } from "@mui/material";
import React from "react";

export const ProjectTable = ({projectData}) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr",
        }}
      >
        {projectData &&
          projectData.map((item, index) => (
            <Box key={index}>{item?.projectName}</Box>
          ))}
      </Box>
    </>
  );
};
