import { Box, Button, Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodayHoliday, addHoliday } from "../../../Redux/Slice/holidaySlice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import { AddHolidayModal, OpenHoliday } from "./HolidayModal/HolidayModal";
import CurrentHoliday from "./CurrentHoliday";

const Holiday = () => {
  const dispatch = useDispatch();
  const { data: holidayData } = useGetHoliday();

  const [getID, setGetID] = useState({});

  const holidays = useSelector((state) => state.holiday.holidays);
  const todayHoliday = useSelector((state) => state.holiday.todayHoliday);

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

      // Check if there's a holiday today and update the state accordingly
      const today = new Date().toISOString().split("T")[0];
      const todayEvents = formattedEvents.filter((event) => event.date === today);
      const isTodayHoliday = todayEvents.length > 0;
      dispatch(setTodayHoliday(isTodayHoliday));
      dispatch(addHoliday(todayEvents));
    }
  }, [holidayData, dispatch]);

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
            events={events}
            
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