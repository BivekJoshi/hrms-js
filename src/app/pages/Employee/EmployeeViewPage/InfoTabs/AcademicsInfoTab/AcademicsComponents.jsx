import React, { useContext } from "react";

import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Divider, Typography } from "@mui/material";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";

const primaryColor = "#1c7ed6";
const AcademicsComponents = ({ data }) => {
  const { mode } = useContext(ThemeModeContext);
  return (
    <Box bgcolor={mode === "light" ? "" : "#414141"}>
      <Divider>{data.passedLevel}</Divider>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography
            style={{
              color: primaryColor,
              fontWeight: "bolder",
              fontSize: "larger",
            }}
          >
            {data.institute}
          </Typography>
          <Typography style={{ fontWeight: "bolder", fontSize: "larger" }}>
            {data.board}
          </Typography>
          <Typography style={{ fontSize: "15px" }}>{data.grade}</Typography>
          <Typography style={{ fontSize: "13px" }}>
            {data.passedYear}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Box>
  );
};

export default AcademicsComponents;
