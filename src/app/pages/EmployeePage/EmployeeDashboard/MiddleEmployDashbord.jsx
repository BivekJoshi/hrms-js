import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { EmployLineChart } from "../Component/EmployLineChart";
import GaugeChart from "react-gauge-chart";
import {
  useGetEmployeeAttendanceMonthWise,
  useGetEmployeeAverageWork,
} from "../../../hooks/attendance/useAttendance";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import RadialBar from "./radialBar";

export const MiddleEmployDashbord = ({}) => {
  const { data: attendanceData } = useGetEmployeeAttendanceMonthWise(2080);
  const { data } = useGetEmployeeAverageWork();
  const averageWork = data !== "NaN" ? ((data / 9) * 100) / 100 : 0;
  const { mode } = useContext(ThemeModeContext);
  const m = useMediaQuery("(min-width:9000px)");
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
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

        {/* <RadialBar averageWork={averageWork} m={m} data={data}/> */}
      </Box>
    </Box>
  );
};
