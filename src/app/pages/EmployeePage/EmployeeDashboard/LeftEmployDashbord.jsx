import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import "../../Style/Style.css";
import { Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetEventByMonth } from "../../../hooks/event/useEvent";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetHolidaybyMonth } from "../../../hooks/holiday/useHoliday";
import { useNavigate } from "react-router-dom";

export const LeftEmployDashbord = ({}) => {
  const navigate = useNavigate();
  const { mode } = useContext(ThemeModeContext);

  const monthAd = new Date().toLocaleString("en-US", { month: "2-digit" });

  const { data: employAllNotiData } = useGetEventByMonth(monthAd);
  const { data: currentHoliday } = useGetHolidaybyMonth(monthAd);

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
        <Typography variant="h5" style={{ marginBottom: "1rem" }}>Event & Holiday</Typography>
        <Box
          className={
            mode === "light"
              ? " employeeDeshbord"
              : "employeeDeshbordBGDark employeeDeshbord"
          }
          boxShadow="7"
          padding=".5rem"
          borderRadius="10px"
        >
          <Box className="employeeDeshbord" padding="1rem 2rem 0">
            <Typography variant="h6">Event this month </Typography>

            <Box display="grid" gap="1rem">
              {employAllNotiData?.slice(0, 3).map((notify, index) => (
                <Box key={index}>
                  <Box
                    onClick={() => toggleDropdown(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    border="1px solid #d0d0d5"
                    borderRadius=".5rem"
                    padding="0 1rem"
                    alignItems="center"
                    boxShadow={2}
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
                    <Box
                      className="notification"
                      bgcolor={mode === "light" ? "#e7e2e2" : "#565454"}
                    >
                      <Typography>At {notify.eventLocation}</Typography>
                      <Typography>Time: {notify.eventTime}</Typography>
                      <Typography>{notify.eventName}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <ButtonComponent
                OnClick={() => {
                  navigate("/employee/event");
                }}
                buttonName={"Click here to see all event"}
              />
            </Box>
          </Box>
          <Box className="employeeDeshbord" padding="1rem 2rem 1rem">
            <Typography variant="h6">Holiday this month</Typography>

            <Box display="grid" gap="1rem">
              {currentHoliday?.slice(0, 3).map((notify, index) => (
                <Box key={index}>
                  <Box
                    onClick={() => toggleDropdownHoliday(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    border="1px solid #d0d0d5"
                    borderRadius=".5rem"
                    padding="0 1rem"
                    alignItems="center"
                    boxShadow={2}
                  >
                    {notify?.holidayName} : {notify?.holidayDate}
                    <Box>
                      {openHolidayIndex === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  </Box>
                  {openHolidayIndex === index && (
                    <Box
                      className="notification"
                      bgcolor={mode === "light" ? "#e7e2e2" : "#565454"}
                    >
                      <Typography>{notify?.holidayDescription}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <ButtonComponent
                OnClick={() => {
                  navigate("/employee/holiday");
                }}
                buttonName={"Click here to see All Holiday"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
