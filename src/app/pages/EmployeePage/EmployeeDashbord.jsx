import { Box, Stack } from "@mui/system";
import React from "react";
import Male from "../../../assets/male.png";
import "../Style/Style.css";
import { LeftEmployDashbord } from "./Component/LeftEmployDashbord";
import { RightEmployDashbord } from "./Component/RightEmployDashbord";

export const EmployeeDashbord = (props) => {
  return (
    <Box display="grid" gridTemplateRows="1fr" gap="1rem">
      <Box
        display="flex"
        flexDirection="row"
        gap="3rem"
        className="employeeDeshbordBG"
        padding="1rem 2rem"
      >
        <img src={Male} alt="profile" />
        <Box alignSelf="center">
          <h3>Welcome , Vivek</h3>
          <h3> Thursday, May 1, 2023</h3>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="3fr 2fr" gap="3rem">
        <LeftEmployDashbord />
        <RightEmployDashbord />
      </Box>
    </Box>
  );
};
