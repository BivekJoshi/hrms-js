import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { EmployLineChart } from "../Component/EmployLineChart";
import GaugeChart from "react-gauge-chart";
import { PendingTask } from "../Component/PendingTask";
import { useGetEmployeeAttendanceMonthWise } from "../../../hooks/attendance/useAttendance";

export const MiddleEmployDashbord = ({ employData }) => {
  const [thisYear, setThisYear] = useState()
  const { data: attendanceData } = useGetEmployeeAttendanceMonthWise(
    employData.employeeId,
    2080
  );


  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      padding="2rem 0 3rem"
      gap="1rem"
    >
      <Box>
        <h3>Employee overal Attendance</h3>
        <Box marginTop="-2.5rem" height="100%">
          <EmployLineChart attendanceData={attendanceData} />
        </Box>
      </Box>
      <Box>
        <h3>Average working Hour</h3>
        <Box marginTop="3rem">
          <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={0.86} />
          <Stack flexDirection="row" justifyContent="space-evenly">
            <Typography>1 Hour</Typography>
            <Typography>80%</Typography>
            <Typography>8 hour</Typography>
          </Stack>
        </Box>
      </Box>
      {/* <Box className="taskTable">
        <h3>Pending Task</h3>
        <Box marginTop="2rem">
          <PendingTask />
        </Box>
      </Box> */}
    </Box>
  );
};
