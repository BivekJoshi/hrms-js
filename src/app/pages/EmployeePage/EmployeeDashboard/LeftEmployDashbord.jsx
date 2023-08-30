import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Male from "../../../../assets/male.png";
import "../../Style/Style.css";
import { Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import {
  useGetEvent,
  useGetEventNotification,
} from "../../../hooks/event/useEvent";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";

export const LeftEmployDashbord = ({}) => {
  const { mode } = useContext(ThemeModeContext);
  const { data: employNotiData } = useGetEventNotification();
  const { data: employAllNotiData } = useGetEvent();
  console.log(employAllNotiData);

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
  ];

  return (
    <Box className="employeeDeshbord">
      <Box className="employeeDeshbord">
        <h3>Today</h3>
        {employeeEventData.map((eventData) => (
          <Box
            className={
              mode === "light" ? "employeeDeshbordBG" : "employeeDeshbordBGDark"
            }
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
      <Box>
        <h3 style={{ marginBottom: "1rem" }}>Event</h3>
        <Box
          className={
            mode === "light"
              ? "employeeDeshbordBG employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
        >
          <Box className="employeeDeshbord" padding="1rem 2rem 0">
            <h4> Today Event</h4>
            <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap="1rem">
              {employNotiData?.events?.map((notify, index) => (
                <Box key={index} className="notification">
                  <Typography>At {notify.eventLocation}</Typography>
                  <Typography>Time: {notify.eventTime}</Typography>
                  <Typography>{notify.eventName}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="employeeDeshbord" padding="0 2rem 1rem">
            <h4> Upcoming Event </h4>{" "}
            <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap="1rem">
              {employAllNotiData?.slice(0, 2).map((notify, index) => (
                <Box key={index} className="notification">
                  <Typography>At {notify.eventLocation}</Typography>
                  <Typography>Time: {notify.eventTime}</Typography>
                  <Typography>{notify.eventName}</Typography>
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <ButtonComponent buttonName={"Click here to see full event"} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="employeeDeshbord ">
        <h3>Check Mail</h3>
        <Box
          className={
            mode === "light" ? "employeeDeshbordBG" : "employeeDeshbordBGDark"
          }
        >
          <Typography padding="1rem 2rem">
            please check birthday mail
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
