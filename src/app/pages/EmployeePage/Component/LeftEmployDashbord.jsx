import { Box, Stack } from "@mui/system";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Male from "../../../../assets/male.png";
import "../../Style/Style.css";
import { Typography } from "@mui/material";

export const LeftEmployDashbord = (props) => {
  const employeeEventData = [
    {
      icon: <AccessTimeIcon />,
      description: "Richard Miles is off sick today",
      photo: Male,
    },
    {
      icon: <AccessTimeIcon />,
      description: "Richard Miles is off sick today",
      photo: Male,
    },
    {
      icon: <AccessTimeIcon />,
      description: "Richard Miles is off sick today",
      photo: Male,
    },
    {
      icon: <AccessTimeIcon />,
      description: "Richard Miles is off sick today",
      photo: Male,
    },
    {
      icon: <AccessTimeIcon />,
      description: "Richard Miles is off sick today",
      photo: Male,
    },
  ];
  return (
    <Box className="employeeDeshbord">
      <Box className="employeeDeshbord">
        <h3>Today</h3>
        {employeeEventData.map((eventData) => (
          <Box
            className="employeeDeshbordBG"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            border="1px solid #ded7ca"
            borderRadius="1rem"
          >
            <Stack flexDirection="row" gap="1rem">
              {eventData.icon}
              {eventData.description}
            </Stack>
            <img
              src={eventData.photo}
              alt="hi"
              style={{ width: "3%", borderRadius: "2rem" }}
            />
          </Box>
        ))}
      </Box>
      <Box className="employeeDeshbord employeeDeshbordBG">
        <h3>Event</h3>
        <Box className="employeeDeshbord" padding="2rem">
          <h5> Today Event</h5> <p>At Kamalpokhari </p>THis is description and
          Location.
        </Box>
        <Box className="employeeDeshbord" padding="2rem">
          <h5> Today Event</h5> <p>At Kamalpokhari </p>THis is description and
          Location.
        </Box>
      </Box>
      <Box className="employeeDeshbord employeeDeshbordBG">
        <h3>Check Mail</h3>
        <Typography>please check birthday mail</Typography>
      </Box>
    </Box>
  );
};
