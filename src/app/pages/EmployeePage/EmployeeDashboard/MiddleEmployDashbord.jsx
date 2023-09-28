import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { EmployLineChart } from "../Component/EmployLineChart";
import GaugeChart from "react-gauge-chart";
import { PendingTask } from "../Component/PendingTask";
import {
  useGetEmployeeAttendanceMonthWise,
  useGetEmployeeAverageWork,
} from "../../../hooks/attendance/useAttendance";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const MiddleEmployDashbord = ({}) => {
  const { data: attendanceData } = useGetEmployeeAttendanceMonthWise(2080);
  const { mode } = useContext(ThemeModeContext);
  const { data } = useGetEmployeeAverageWork();
  const averageWork = data / 9;
  
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      padding="2rem 0 3rem"
      gap="1rem"
    >
      <Box>
        <h3>Employee overal Attendance</h3>
        <Box marginTop="0" height="100%">
          <EmployLineChart attendanceData={attendanceData} />
        </Box>
      </Box>
      <Box>
        <h3>Average working Hour</h3>
        <Box marginTop="3rem">
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={9}
            // style={{width:"80%"}}
            textColor={mode === "light" ? "white" : "#3838388a"}
            percent={averageWork === 1 ? 1 : averageWork}
          />
          <Stack flexDirection="row" justifyContent="space-evenly">
            <Typography>1 Hour</Typography>
            <Typography>{data} Hour</Typography>
            <Typography>9 hour</Typography>
          </Stack>
        </Box>
      </Box>
      
    </Box>
  );
};
