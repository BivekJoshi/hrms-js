import { Box, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from "react";
import { AddEventModal, OpenEvent } from './EventModal/EventModal';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useGetEvent } from '../../hooks/event/useEvent';

const Event = () => {
    const { data: eventData, isLoading } = useGetEvent();
    // console.log(eventData)

    const [getEventID, setEventGetID] = useState({});


    const handleOpenModal = (e) => {
        setEventGetID(e?.event?._def?.publicId);
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
        if (eventData) {
            const formattedEvents = eventData.map(event => ({
                title: event.eventName,
                date: event.eventDate,
                description: event.eventDescription,
                // backgroundColor: "red",
                id:event.id,
            }));
            setEvents(formattedEvents);
        }
    }, [eventData]);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
                    +Add Event
                </Button>
            </Box>
            <br />
            {openAddModal && (
                <AddEventModal
                    open={openAddModal}
                    handleCloseModal={handleCloseAddModal}
                />
            )}
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
                eventClick={handleOpenModal}
            />

               {openModal && (
                <OpenEvent
                    id={getEventID}
                    open={openModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    )
}

export default Event;
