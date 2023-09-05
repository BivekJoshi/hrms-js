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

const AttendenceInfo = () => {
  const { id } = useParams();
  const { data: attendanceData } = useGetEmployeeAttendanceById(id);

  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (attendanceData) {
      const formattedEvents = attendanceData.map((event) => ({
        title: event.timeIn,
        date: event.attendanceDate,
        backgroundColor: "white",
        id: event.id,
      }));
      setEvents(formattedEvents);
    }
  }, [attendanceData]);

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
      <br/>
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
    </Box>
  );
};

export default AttendenceInfo;

function renderEventContent(eventInfo) {
  return (
    <Box className="attendanceHover">
      <Box border={"none"} textAlign="center">
        {!eventInfo ? (
          <HdrAutoOutlinedIcon sx={{ color: "red" }} />
        ) : (
          <TbCircleLetterP
            style={{ width: "2.5rem", height: "2.5rem", color: "green" }}
          />
        )}
      </Box>
      <Box className="timeInO">
        <Typography>TimeIn : {eventInfo.event.title}</Typography>
        <Typography>TimeOut : {eventInfo.event.date}</Typography>
      </Box>
    </Box>
  );
}
