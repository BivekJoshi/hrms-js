import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetEmployeeAttendanceById } from "../../../../../hooks/attendance/useAttendance";
import { useParams } from "react-router-dom";


const AttendenceInfo = () => {
    const { id } = useParams();
    const { data: attendanceData, isLoading: loadingAttendance } = useGetEmployeeAttendanceById(id);
 
    console.log(attendanceData,"Attendance")
    const calendarRef = useRef(null);

    const [events, setEvents] = useState([]);
    useEffect(() => {
        if (attendanceData) {
            const formattedEvents = attendanceData.map(event => ({
                title: event.timeIn,
                date: event.attendanceDate,
                backgroundColor: "green",
                id: event.id,
            }));
            setEvents(formattedEvents);
        }
    }, [attendanceData]);

    return (
        <>

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
            />
        </>
    )
}

export default AttendenceInfo;
