import { Box } from "@mui/system";
import React from "react";
import Male from "../../../assets/male.png";

export const EmployeeDashbord = (props) => {
  return (
    <Box display="grid" gridTemplateRows="1fr" gap="1rem">
      <Box display="flex" flexDirection="row" gap="3rem" >
        <img src={Male} alt="profile" />
        <Box alignSelf="center">
          <h3>Welcome , Vivek</h3>
          <h3> Thursday, May 1, 2023</h3>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem">
        <Box>hi</Box>
        <Box>hellow</Box>
      </Box>
    </Box>
  );
};
