import React, { useContext } from "react";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Box } from "@mui/material";
import AcademicsComponents from "./AcademicsComponents";
import "../../EmployProfile/Style/Style.css";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";

const AcademicsInfo = ({ data }) => {
  const { mode } = useContext(ThemeModeContext);
  return (
    <Box
      className="profileBasic"
      sx={{
        bgcolor: mode === "light" ? "#ededed" : "#454546",
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          marginTop: "0rem",
        }}
      >
        {data
          ? data?.qualifications?.sort((a, b) => b.passedYear - a.passedYear)
              .map((item, index) => (
                <AcademicsComponents key={index} data={item} />
              ))
          : ""}
      </Timeline>
    </Box>
  );
};

export default AcademicsInfo;
