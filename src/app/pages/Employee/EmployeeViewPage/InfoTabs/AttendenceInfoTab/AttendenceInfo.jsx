import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetEmployeeAttendanceById } from "../../../../../hooks/attendance/useAttendance";
import { useParams } from "react-router-dom";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";
import { TbCircleLetterP } from "react-icons/tb";
import { Box, Typography } from "@mui/material";
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
              console.log(formattedEvents)

      setEvents(formattedEvents);
    }
  }, [attendanceData]);

  return (
    <Box className={attendanceData ? "attendenceDesign" : ""}>
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
  console.log(eventInfo)
  return (
    <Box className="attendanceHover">
      {/* {eventInfo?.map((info) => (
        <> */}
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
        {/* </>
      ))} */}
    </Box>
  );
}
