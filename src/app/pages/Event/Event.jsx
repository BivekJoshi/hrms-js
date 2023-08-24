import React, { useState, useRef, useEffect } from "react";
import { Box, Button } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetEvent } from "../../hooks/event/useEvent";
import { AddEventModal, OpenEvent } from "./EventModal/EventModal";
import HocButton from "../../hoc/hocButton";
import PermissionHoc from "../../hoc/permissionHoc";

const Event = ({ permissions }) => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const { data: eventData, isLoading } = useGetEvent();

  useEffect(() => {
    if (eventData) {
      const formattedEvents = eventData.map((event) => ({
        title: event?.eventName,
        date: event?.eventDate,
        description: event?.eventDescription,
        id: event?.id,
      }));
      setEvents(formattedEvents);
    }
  }, [eventData]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [getEventID, setEventGetID] = useState({});

  const handleOpenModal = (e) => {
    setEventGetID(e?.event?._def?.publicId);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  // const handleTodayClick = (events) => {
  //   console.log(events)
  //   events.gotoDate(new Date());
  // };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HocButton
          permissions={permissions.canAdd}
          color={"primary"}
          variant={"contained"}
          onClick={() => setOpenAddModal(true)}
          buttonName={"+Add Event"}
        />
      </Box>
      <br />
      {openAddModal && (
        <AddEventModal
          open={() => setOpenAddModal(true)}
          handleCloseModal={() => setOpenAddModal(false)}
        />
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "customTodayButton prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventClick={handleOpenModal}
        customButtons={{
            customTodayButton: {
              text: "Today",
              // click: function () {
              //   handleTodayClick(events);
              // },
            },
          }}
        // loading={isLoading}
      />

      {openModal && (
        <OpenEvent
          id={getEventID}
          open={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(Event);
