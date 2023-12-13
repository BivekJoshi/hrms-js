import React, { useContext } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const RadialBar = ({ averageWork, m, data }) => {
  const { mode } = useContext(ThemeModeContext);
  const options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [67],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };
  return (
    <Box
      boxShadow={7}
      borderRadius="10px"
      bgcolor={mode === "light" ? "" : "#3f413f"}
      padding="2rem"
    >
      {/* ApexChart */}
      <ReactApexChart options={options} series={options.series} type="radialBar" height={280} />

      {/* Additional Information */}
      <Stack flexDirection="row" justifyContent="space-evenly">
        <Typography>1 Hour</Typography>
        <Typography>{data !== "NaN" ? data : "0"} Hour</Typography>
        <Typography>9 hour</Typography>
      </Stack>
    </Box>
  );
};

export default RadialBar;