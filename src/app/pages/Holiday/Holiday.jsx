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
    setOpenOnClickModal(true);
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openOnClickModal, setOpenOnClickModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseModal = () => setOpenOnClickModal(false);

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
      {/* <Grid container spacing={2}> */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "1fr 3fr" }}
        columnGap="1rem"
      >
        <Box gridRow={{xs:"2/3", lg:"1"}}>
        <CurrentHoliday />
        </Box>

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
          events={events}
        />
      </Box>
      {/* </Grid> */}

      {openAddModal && (
        <AddHolidayModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {openOnClickModal && (
        <OpenHoliday
          id={getID}
          open={openOnClickModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Holiday;
