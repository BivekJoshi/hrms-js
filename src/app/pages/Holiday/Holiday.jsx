import { Box, Button, Grid, Paper } from '@mui/material';
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetHoliday, useGetHolidayCurrent } from '../../hooks/holiday/useHoliday';
import { AddHolidayModal, OpenHoliday } from './HolidayModal/HolidayModal';
import CurrentHoliday from './CurrentHoliday';

const Holiday = () => {
    const { data: holidayData, isLoading } = useGetHoliday();

    const [getID, setGetID] = useState({});

    const handleOpenModal = (e) => {
        // console.log(e)
        setGetID(e?.event?._def?.publicId);
        setOpenModal(true);
    };

    console.log(getID)

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    const handleAddOpenModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    // const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false);

    const calendarRef = useRef(null);

    const [events, setEvents] = useState([]);
    useEffect(() => {
        if (holidayData) {
            const formattedEvents = holidayData.map(event => ({
                title: event.holidayName,
                date: event.holidayDate,
                backgroundColor: "red",
                id: event.id,
            }));
            setEvents(formattedEvents);
        }
    }, [holidayData]);

    // const handleOpenModal = () => {
    //     console.log("CLICKEDDDDD")
    // };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
                    +Add Holiday
                </Button>
            </Box>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CurrentHoliday />
                </Grid>
                <Grid item xs={9}>
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
                    // eventClick={handleOpenModal}
                    // dateClick={handleOpenModal}
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
    )
}

export default Holiday;
