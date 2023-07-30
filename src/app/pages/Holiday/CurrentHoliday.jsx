import React from "react";
import { useGetHolidayCurrent } from "../../hooks/holiday/useHoliday";
import { Box, Paper, Typography } from "@mui/material";
import { Timeline, TimelineContent, TimelineDot, TimelineItem } from "@mui/lab";
import { TimelineSeparator, timelineItemClasses } from "@mui/lab";

const CurrentHoliday = () => {
  const { data: currentData } = useGetHolidayCurrent();

  // Get the current month
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <Paper
      sx={{
        backgroundColor: "#01579b",
        height: "90vh",
        padding: 1,
        color: "#fff",
      }}
    >
      <Box sx={{textAlign: "center"}}><h1> {currentMonth}</h1></Box>
      {currentData &&
        currentData.map((item) => (
          <Timeline
            key={item.id}
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              margin:" 0 !important",
              padding:"0 16px",
              overflowY: "auto",
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                {/* <TimelineConnector /> */}
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  sx={{
                    display: "flex",
                    fontWeight: "bolder",
                    fontSize: "larger",
                  }}
                >
                  {item.holidayName}
                  <Box margin="0.4rem 0.8rem" fontSize= "0.8rem" > {item.holidayDate}</Box>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
    </Paper>
  );
};

export default CurrentHoliday;
