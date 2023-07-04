import React from 'react';
import { useGetHolidayCurrent } from '../../hooks/holiday/useHoliday';
import { Paper, Typography } from '@mui/material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from '@mui/lab';

const CurrentHoliday = () => {
    const { data: currentData } = useGetHolidayCurrent();

    // Get the current month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <Paper sx={{ backgroundColor: "#76818d", height: "90vh", padding: 3, color: "#fff" }}>
            <h1> {currentMonth}</h1>
            {currentData && currentData.map((item) => (
                <Timeline key={item.id}
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    }}
                >
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography
                                style={{
                                    // color: primaryColor,
                                    fontWeight: 'bolder',
                                    fontSize: 'larger',
                                }}
                            >
                                {item.holidayName}
                            </Typography>
                            <Typography style={{ fontWeight: 'bolder', fontSize: 'larger' }}>
                                {item.holidayDate}
                            </Typography>
                            <Typography style={{ fontSize: '13px' }}>
                                {item.holidayDescription}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            ))}
        </Paper>
    );
};

export default CurrentHoliday;
