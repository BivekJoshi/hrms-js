import { Box } from "@mui/system";
import React from "react";
import "../../Style/Style.css";

export const RightEmployDashbord = (props) => {
  return (
    <Box className="employeeDeshbord">
      <Box>
        <h3>Project</h3>
        <Box className="employeeDeshbordBG" padding="1rem 2rem">
          <h4>working On</h4>
          <Box> HRMS</Box>
        </Box>
      </Box>
      <Box>
        <h3>Your Leaves</h3>
        <Box></Box>
      </Box>
    </Box>
  );
};
