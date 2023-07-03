import React from 'react';
import { useGetHolidayCurrent } from '../../hooks/holiday/useHoliday';
import { Paper } from '@mui/material';

const CurrentHoliday = () => {
    const { data: currentData } = useGetHolidayCurrent();

    // Get the current month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <Paper sx={{ backgroundColor: "#76818d", height: "90vh", padding: 3, color: "#fff" }}>
            <h1> {currentMonth}</h1>
            {currentData && currentData.map((item) => (
                <div key={item.id}>
                    {item.holidayName}
                    
                </div>
            ))}
        </Paper>
    );
};

export default CurrentHoliday;
