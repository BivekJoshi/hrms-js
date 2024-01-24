import React, { useContext, useState } from "react";
import "../../Style/Style.css";
import { Grid, Typography } from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetEventByMonth } from "../../../hooks/event/useEvent";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetHolidaybyMonth } from "../../../hooks/holiday/useHoliday";
import { useNavigate } from "react-router-dom";
import Event from "../../../../assets/EDevent.png";
import Holiday from "../../../../assets/EDholiday.png";

export const LeftEmployDashbord = ({}) => {
  const navigate = useNavigate();
  const { mode, palette } = useContext(ThemeModeContext);
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
  const currentDate = new Date();

  const calculateRemainingDays = (eventDate) => {
    if (!eventDate) return "";
    const eventDateTime = new Date(eventDate).getTime();
    const remainingTime = eventDateTime - currentDate.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
    return remainingDays;
  };

  const TimeIn12Hour = (eventTime) => {
    if (!eventTime) return "";
    const [hours, minutes] = eventTime.split(":");
    const isPM = parseInt(hours) >= 12;
    const hours12 = parseInt(hours) % 12 || 12;

    const formattedTime = `${hours12}:${minutes} ${isPM ? "PM" : "AM"}`;
    return formattedTime;
  };

  const upcomingEvents = employAllNotiData?.filter((event) => {
    const eventDate = new Date(event.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return eventDate >= currentDate;
  });

  const upcomingHolidays = currentHoliday?.filter((holiday) => {
    const holidayDate = new Date(holiday.holidayDate);
    holidayDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return holidayDate >= currentDate;
  });

  // only day and month
  const getUpcomingDay = (eventDate) => {
    const eventDateObject = new Date(eventDate);
    const month = eventDateObject.toLocaleString("default", { month: "short" });
    const day = eventDateObject.getDate();
    return { day, month };
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" gap="2rem">
        <Grid display="flex" flexDirection="column" gap="1rem">
          <Typography variant="h5">Upcoming Events </Typography>
          <Grid display="grid" gap="1rem">
            {upcomingEvents?.length !== 0 ? (
              upcomingEvents?.slice(0, 3).map((notify, index) => (
                <Grid key={index}>
                  <Grid
                    onClick={() => toggleDropdown(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    borderRadius="8px"
                    padding=".5em 1rem"
                    alignItems="center"
                    bgcolor={palette.background.event}
                    boxShadow={2}
                  >
                    <Grid
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={2}
                    >
                      <div
                        style={{
                          border: "1px solid #E0E0E0",
                          borderRadius: "6px 6px 0 0",
                        }}
                      >
                        <Typography
                          style={{
                            backgroundColor: palette.primary.main,
                            padding: "1px 8px",
                            color: "#fff",
                            borderRadius: "6px 6px 0 0",
                          }}
                          fontSize="11px"
                        >
                          {getUpcomingDay(notify?.eventDate).month}
                        </Typography>
                        <Typography
                          fontSize="11px"
                          textAlign="center"
                          bgcolor={mode === "light" ? "#fff" : ""}
                        >
                          {getUpcomingDay(notify?.eventDate).day}
                        </Typography>
                      </div>
                      <Typography
                        fontWeight={600}
                        fontSize="14px"
                        sx={{
                          overflowWrap: "break-word",
                          textTransform: "capitalize",
                          wordBreak: "break-all",
                          maxWidth: '80%',
                        }}
                      >
                        {notify?.eventName}
                      </Typography>
                    </Grid>
                    <Typography fontSize="12px">
                      Remaining: {calculateRemainingDays(notify?.eventDate)}day
                    </Typography>
                    <Typography fontSize="12px">
                      Time: {TimeIn12Hour(notify?.eventTime)}
                    </Typography>
                  </Grid>
                  {openItemIndex === index && (
                    <Grid
                      className="notification"
                      bgcolor={mode === "light" ? "#ECFFE3" : "#313131"}
                      boxShadow={2}
                      marginTop="8px"
                      sx={{
                        overflowWrap: "break-word",
                        textTransform: "capitalize",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography>
                        At {notify?.eventName}: {notify?.eventDescription}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              ))
            ) : (
              <Grid
                padding="28px 16px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bgcolor="#ECFFE3"
                gap={1}
              >
                <img src={Event} alt="sad.png" />

                <Typography variant="h6" color="black">
                  No any Upcoming Events
                </Typography>
              </Grid>
            )}
          </Grid>
          {upcomingEvents?.length >= 4 && (
            <Grid textAlign="center">
              <ButtonComponent
                OnClick={() => {
                  navigate("/employee/event");
                }}
                buttonName={"Click here to see all event"}
              />
            </Grid>
          )}
        </Grid>
        <Grid className="employeeDeshbord">
          <Typography variant="h5">Upcoming Holidays</Typography>

          <Grid display="grid" gap="1rem">
            {upcomingHolidays?.length > 0 ? (
              upcomingHolidays?.slice(0, 3).map((notify, index) => (
                <Grid key={index}>
                  <Grid
                    onClick={() => toggleDropdownHoliday(index)}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    borderRadius=".5rem"
                    alignItems="center"
                    boxShadow={2}
                    padding=".5em 1rem"
                    bgcolor={palette.background.holiday}
                  >
                    <Grid
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={2}
                    >
                      <div
                        style={{
                          border: "1px solid #E0E0E0",
                          borderRadius: "6px 6px 0 0",
                        }}
                      >
                        <Typography
                          style={{
                            backgroundColor: palette.primary.holiday,
                            padding: "1px 8px",
                            color: "#fff",
                            borderRadius: "6px 6px 0 0",
                          }}
                          fontSize="11px"
                        >
                          {getUpcomingDay(notify?.holidayDate).month}
                        </Typography>
                        <Typography
                          fontSize="11px"
                          textAlign="center"
                          bgcolor={mode === "light" ? "#fff" : ""}
                        >
                          {getUpcomingDay(notify?.holidayDate).day}
                        </Typography>
                      </div>
                      <Typography
                        fontWeight={600}
                        fontSize="14px"
                        sx={{
                          overflowWrap: "break-word",
                          textTransform: "capitalize",
                          wordBreak: "break-all",
                          maxWidth: "80%",
                        }}
                      >
                        {notify?.holidayName}
                      </Typography>
                     
                    {/* <Typography fontSize="12px">
                      Time: {TimeIn12Hour(notify?.holida)}
                    </Typography> */}
                     
                      {/* {notify?.holidayName} */}
                    </Grid>

                    <Typography fontSize="12px">
                      Remaining: {calculateRemainingDays(notify?.holidayDate)}{" "}
                      day
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid
                padding="28px 16px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bgcolor={palette.background.holiday}
                gap={1}
              >
                <img src={Holiday} alt="EDholiday.png" />

                <Typography variant="h6" color="black">
                  No any Upcoming Holidays
                </Typography>
              </Grid>
            )}
          </Grid>
          {upcomingHolidays?.length >= 4 && (
            <Grid textAlign="center">
              <ButtonComponent
                OnClick={() => {
                  navigate("/employee/holiday");
                }}
                buttonName={"Click here to see All Holiday"}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
