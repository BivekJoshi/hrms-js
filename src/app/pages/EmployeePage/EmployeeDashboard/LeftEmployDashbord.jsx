import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import "../../Style/Style.css";
import { Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import {
  useGetEvent,
} from "../../../hooks/event/useEvent";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const LeftEmployDashbord = ({}) => {
  const { mode } = useContext(ThemeModeContext);
  const { data: employAllNotiData } = useGetEvent();
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [openHolidayIndex, setOpenHolidayIndex] = useState(-1);

  const toggleDropdown = (index) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const toggleDropdownHoliday = (index) => {
    setOpenHolidayIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <Box className="employeeDeshbord">
      <Box>
        <h3 style={{ marginBottom: "1rem" }}>Event & Holiday</h3>
        <Box
          className={
            mode === "light"
              ? " employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          boxShadow="2"
          padding=".5rem"
        >
          <Box className="employeeDeshbord" padding="1rem 2rem 0">
            <h4>Event this month </h4>

            <Box display="grid" gap="1rem">
              {employAllNotiData?.slice(0, 3).map((notify, index) => (
                <Box key={index}>
                  <Box
                    onClick={() => toggleDropdown(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    border="1px solid blue"
                    borderRadius=".5rem"
                    padding="0 1rem"
                    alignItems="center"
                  >
                    {notify.eventName}
                    <Box>
                      {openItemIndex === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </Box>
                  {openItemIndex === index && (
                    <Box className="notification">
                      <Typography>At {notify.eventLocation}</Typography>
                      <Typography>Time: {notify.eventTime}</Typography>
                      <Typography>{notify.eventName}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <ButtonComponent buttonName={"Click here to see all event"} />
            </Box>
          </Box>
          <Box className="employeeDeshbord" padding="1rem 2rem 1rem">
            <h4>Holiday this month</h4>

            <Box display="grid" gap="1rem">
              {employAllNotiData?.slice(0, 3).map((notify, index) => (
                <Box key={index}>
                  <Box
                    onClick={() => toggleDropdownHoliday(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    border="1px solid blue"
                    borderRadius=".5rem"
                    padding="0 1rem"
                    alignItems="center"
                  >
                    {notify.eventName} :
                    <Box>
                      {openHolidayIndex === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </Box>
                  {openHolidayIndex === index && (
                    <Box className="notification">
                      <Typography>At {notify.eventLocation}</Typography>
                      <Typography>Time: {notify.eventTime}</Typography>
                      <Typography>{notify.eventName}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <ButtonComponent buttonName={"Click here to see All Holiday"} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box className="employeeDeshbord ">
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
      </Box> */}
    </Box>
  );
};
