import React from "react";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Box } from "@mui/material";
import AcademicsComponents from "./AcademicsComponents";
import "../../EmployProfile/Style/Style.css"

const AcademicsInfo = ({ data }) => {
  return (
    <Box
      className="profileBasic"
      sx={{
        bgcolor: "#ededed",
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          marginTop:"0rem"

        }}
      >
        {data.qualifications
          .sort((a, b) => b.passedYear - a.passedYear)
          .map((item, index) => (
            <AcademicsComponents key={index} data={item} />
          ))}
      </Timeline>
    </Box>
  );
};

export default AcademicsInfo;
