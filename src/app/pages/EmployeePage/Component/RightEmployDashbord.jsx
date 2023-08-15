import { Box } from "@mui/system";
import React from "react";
import "../../Style/Style.css";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import { Divider, Typography } from "@mui/material";

export const RightEmployDashbord = (props) => {
  return (
    <Box>
      <Box>
        <h3>Project</h3>
        <Box
          className="employeeDeshbordBG employeeDeshbordMP"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            className="employeeDeshbordBG employeeDeshbordMP"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <h4>WORKING ON</h4>
              HRMS
            </Box>
            <Divider sx={{ border: "1px solid black" }} />
            <Box>
              <h4>OTHER PROJECT</h4>
              HRMS
            </Box>
          </Box>
          <Box alignSelf="center" paddingTop="2rem">
            <h4> Total Project</h4>
            <Typography textAlign="center">6</Typography>
          </Box>
        </Box>
      </Box>
      <Box marginTop="1rem">
        <h3>Your Leaves</h3>
        <Box
          className="employeeDeshbordBG employeeDeshbordMP"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              6<Typography>LEAVE TAKEN</Typography>
            </Box>
            <Divider sx={{ border: "1px solid black" }} />
            <Box>
              <Typography>6</Typography> REMAINING
            </Box>
          </Box>
          <Box alignSelf="center" paddingTop="2rem">
            <ButtonComponent
              buttonName={"APPLY Leave"}
              // OnClick={}
              BGColor={"orange"}
              TextColor={"black"}
            />
          </Box>
        </Box>
      </Box>
      <Box marginTop="1rem">
        <h3>UPCOMMING HOLIDAY</h3>
        <Box className="employeeDeshbordBG employeeDeshbordMP">
          <Typography fontWeight="600" textAlign="center">
            MONDAY 10 JULY, 2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
