import { Box, Button, Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import { AddHolidayModal, OpenHoliday } from "./HolidayModal/HolidayModal";
import CurrentHoliday from "./CurrentHoliday";
import "./Style/Style.css";

const Holiday = () => {
  const { data: holidayData } = useGetHoliday();

  const [getID, setGetID] = useState({});

  const handleOpenModal = (e) => {
    setGetID(e?.event?._def?.publicId);
    setOpenModal(true);
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseModal = () => setOpenModal(false);

  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (holidayData) {
      const formattedEvents = holidayData.map((event) => ({
        title: event.holidayName,
        date: event.holidayDate,
        id: event.id,
      }));
      setEvents(formattedEvents);
    }
  }, [holidayData]);

  const dayCellContentHandler = (arg) => {
    const eventDates = events.map((event) => event.date);
    if (eventDates.includes(arg.dateStr)) {
      arg.dayEl.classList.add("highlight-day");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          +Add Holiday
        </Button>
      </Box>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CurrentHoliday />
        </Grid>
        <Grid item xs={9} className={holidayData ? "calenderDesign" : ""}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventClick={handleOpenModal}
            height={"90vh"}
            events={events}s
          />
        </Grid>
      </Grid>

      {openAddModal && (
        <AddHolidayModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {openModal && (
        <OpenHoliday
          id={getID}
          open={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Holiday;

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <Box border={"none"}>
      <li style={{ fontWeight: 600, fontSize: "1rem", marginLeft: ".5rem" }}>
        {eventInfo.event.title}
      </li>
      {/* <DeleteIcon sx={{width:"2rem"}}/> */}
    </Box>
  );
}
