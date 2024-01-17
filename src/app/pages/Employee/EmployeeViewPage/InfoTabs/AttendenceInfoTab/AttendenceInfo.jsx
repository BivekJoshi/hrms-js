import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetEmployeeAttendanceById } from "../../../../../hooks/attendance/useAttendance";
import { useParams } from "react-router-dom";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";
import { TbCircleLetterP } from "react-icons/tb";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import "../../Style/BasicInfoStyle.css";
import { useGetLoggedInUser } from "../../../../../hooks/auth/usePassword";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";

const AttendenceInfo = ({ data }) => {
  const { data: userData } = useGetLoggedInUser();
  const { data: attendanceData } = data
    ? useGetEmployeeAttendanceById(data?.id)
    : useGetEmployeeAttendanceById(userData?.employeeId);

  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  // const { isEmployee } = useAuth();
  // let id;
  // if (isEmployee) {
  //   const { data: loggedInUserDataInfo } = useGetLoggedInUser();
  //   id = loggedInUserDataInfo?.employeeId;
  // } else {
  //   const { id: paramId } = useParams();
  //   id = paramId;
  // }

  useEffect(() => {
    if (attendanceData) {
      const formattedEvents = attendanceData.map((event) => ({
        title: "Present",
        start: new Date(event.punchTime),
        backgroundColor: "green",
        id: event.empId,
        time: new Date(event.punchTime).toLocaleTimeString(), // Add time property
      }));
      setEvents(formattedEvents);
    }
  }, [attendanceData]);

  // useEffect(() => {
  //   if (attendanceData) {
  //     const formattedEvents = attendanceData.map((event) => ({
  //       title: event.timeIn,
  //       date: event.attendanceDate,
  //       backgroundColor: "white",
  //       id: event.id,
  //     }));
  //     setEvents(formattedEvents);
  //   }
  // }, [attendanceData]);

  return (
    <Box className={attendanceData ? "attendenceDesign" : ""}>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Working Days
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "green",
                }}
              >
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Present Days
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "green",
                }}
              >
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Absent Days
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "green",
                }}
              >
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventContent={renderEventContent}
      />
      <style>
        {`
         .fc .fc-daygrid-day.fc-day-today {
             background-color: #78bcff;
         }
         .fc *{
          text-align: center;
          justify-content: center;
          }
         `}
      </style>
    </Box>
  );
};

export default AttendenceInfo;

function renderEventContent(eventInfo) {
  return (
    <Box className="attendanceHover" sx={{ display: "flex" }}>
      <Box border={"none"} textAlign="center">
        {!eventInfo ? (
          <HdrAutoOutlinedIcon sx={{ color: "red" }} />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <TbCircleLetterP
              style={{ width: "2.5rem", height: "2.5rem", color: "green" }}
            />
            <div>
              <Typography>
                Check In : {eventInfo?.event?._def?.extendedProps?.time}
              </Typography>
              <Typography>
                Check Out : {eventInfo?.event?._def?.extendedProps?.time}
              </Typography>
            </div>
          </div>
        )}
      </Box>
      {/* <Box className="timeInO" sx={{ color: "green" }}>
        <Typography>
          TimeIn : {eventInfo?.event?._def?.extendedProps?.time}
        </Typography>
        <Typography>TimeOut : {eventInfo.event.date}</Typography>
      </Box> */}
    </Box>
  );
}
