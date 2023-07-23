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
        backgroundColor: "#76818d",
        height: "90vh",
        padding: 3,
        color: "#fff",
      }}
    >
      <h1> {currentMonth}</h1>
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
              padding:"0 16px"
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
                  <Box marginLeft=".5rem"> {item.holidayDate}</Box>
                </Typography>
                {/* <Typography style={{ fontWeight: 'bolder', fontSize: 'larger' }}>
                                {item.holidayDate}
                            </Typography> */}
                {/* <Typography style={{ fontSize: '13px' }}>
                                {item.holidayDescription}
                            </Typography> */}
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
    </Paper>
  );
};

export default CurrentHoliday;
