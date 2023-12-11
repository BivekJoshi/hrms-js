import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { EmployLineChart } from "../Component/EmployLineChart";
import GaugeChart from "react-gauge-chart";
import {
  useGetEmployeeAttendanceMonthWise,
  useGetEmployeeAverageWork,
} from "../../../hooks/attendance/useAttendance";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const MiddleEmployDashbord = ({}) => {
  const { data: attendanceData } = useGetEmployeeAttendanceMonthWise(2080);
  const { data } = useGetEmployeeAverageWork();
  const averageWork = data !== "NaN" ? ((data / 9) * 100) / 100 : 0;
  const { mode } = useContext(ThemeModeContext);
  const m = useMediaQuery("(min-width:9000px)");
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      padding="2rem 0 3rem"
      gap="1rem"
    >
      <Box>
        <Typography variant="h5">Employee overal Attendance</Typography>
        <Box
          marginTop="0"
          height="100%"
          boxShadow="7"
          paddingRight="2rem"
          borderRadius="10px"
          bgcolor={mode === "light" ? "" : "#3f413f"}
        >
          <EmployLineChart attendanceData={attendanceData} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Average working Hour</Typography>

        <Box
          boxShadow="7"
          borderRadius="10px"
          bgcolor={mode === "light" ? "" : "#3f413f"}
          padding="2rem"
        >
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={9}
            percent={averageWork === 1 ? 1 : averageWork}
            style={{ textAlign: "center", width: m ? "80%" : "100%" }}
          />
          <Stack flexDirection="row" justifyContent="space-evenly">
            <Typography>1 Hour</Typography>
            <Typography>{data !== "NaN" ? data : "0"} Hour</Typography>
            <Typography>9 hour</Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
