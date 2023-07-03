import { Box, Button, Grid, Paper } from '@mui/material';
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetHoliday, useGetHolidayCurrent } from '../../hooks/holiday/useHoliday';
import { AddHolidayModal } from './HolidayModal/HolidayModal';
import CurrentHoliday from './CurrentHoliday';

const Holiday = () => {
    const { data: holidayData, isLoading } = useGetHoliday();

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleAddOpenModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const calendarRef = useRef(null);

    const [events, setEvents] = useState([]);
    useEffect(() => {
        if (holidayData) {
            const formattedEvents = holidayData.map(event => ({
                title: event.holidayName,
                date: event.holidayDate,
                backgroundColor: "red",
            }));
            setEvents(formattedEvents);
        }
    }, [holidayData]);

    const handleEditHolidaySelectAndOpenModal = () => {
        console.log("CLICKEDDDDD")

    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
                    +Add Holiday
                </Button>
            </Box>
            <br />
            {openAddModal && (
                <AddHolidayModal
                    open={openAddModal}
                    handleCloseModal={handleCloseAddModal}
                />
            )}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CurrentHoliday/>
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
                        height={"90vh"}
                        events={events}
                        eventClick={handleEditHolidaySelectAndOpenModal}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Holiday;
