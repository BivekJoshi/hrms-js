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

//today Date
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}/`;
}

const AttendenceInfo = () => {
  const { id } = useParams();
  const { data: attendanceData } = useGetEmployeeAttendanceById(id);
  // const { ...title } = attendanceData;
  console.log(attendanceData);

  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (attendanceData) {
      const formattedEvents = attendanceData.map((event) => ({
        title: event.timeIn,
        start: event.timeOut,
        date: event.attendanceDate,
        backgroundColor: "white",
        id: event.id,
        // datee: event[0].attendanceDate,
      }));

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
        // eventClick={handleOpenModal}
        height={"90vh"}
        events={events}
        eventContent={renderEventContent}
      />
    </Box>
  );
};

export default AttendenceInfo;

function renderEventContent(eventInfo) {
  console.log(eventInfo.event.date);
  return (
    <Box className="attendanceHover">
      <Box border={"none"} textAlign="center" >
        { !eventInfo ? (
          <HdrAutoOutlinedIcon sx={{ color: "red" }} />
        ) : (
          <TbCircleLetterP
            style={{ width: "2.5rem", height: "2.5rem", color: "green" }}
          />
        )}

        {/* {eventInfo.event.title ? (
          <TbCircleLetterP
            style={{ width: "2.5rem", height: "2.5rem", color: "green" }}
          /> ? (
            currentDate !== eventInfo.event.datee
          ) 
          : (
            <HdrAutoOutlinedIcon style={{ color: "red" }} />
          )
        ) : (
          ""
        )} */}
      </Box>
      <Box  className="timeInO">
        <Typography>TimeIn : {eventInfo.event.title}</Typography>
        <Typography>TimeOut : {eventInfo.event.date}</Typography>
        {/* <Typography>{eventInfo.event.start}</Typography> */}

        {/* <Typography ></Typography> */}
      </Box>
    </Box>
  );
}
