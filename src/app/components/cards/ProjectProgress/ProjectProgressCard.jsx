import { Box, Grid, Stack, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import "../Style/ProjectProgressStyle.css";
import React, { useContext } from "react";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const ProjectProgressCard = ({ projectDataCount }) => {
  const { mode } = useContext(ThemeModeContext);
  const progressData = [
    {
      title: "Completed",
      color: mode === "light" ? "#D6EBFF" : "#0F6FA6",
      count: projectDataCount?.projectInfo?.completed || 0,
    },
    {
      title: "Pending",
      color: mode === "light" ? "#FFDAD5" : "#E53935",
      count: projectDataCount?.projectInfo?.pending || 0,
    },
    {
      title: "Work In Progress",
      color: mode === "light" ? "#FEEFD0" : "#f7b327",
      count: projectDataCount?.projectInfo?.workInProgress || 0,
    },
    {
      title: "Delayed",
      color: mode === "light" ? "#ECFFE3" : "#388E3C",
      count: projectDataCount?.projectInfo?.delayed || 0,
    },
  ];
  const totalCount = progressData.reduce(
    (total, item) => total + item.count,
    0
  );
  return (
    <>
      <Typography variant="v6">Total Project : {totalCount || "0"}</Typography>
      <Grid display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={2}>
        {progressData.map((item, index) => (
          <Grid
            bgcolor={item.color}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="100%"
            height="113px"
            borderRadius="8px"
          >
            <Typography
              alignSelf="center"
              fontSize={{ sm: "22px", md: "18px", lg: "22px" }}
            >
              {item.count}
            </Typography>
            <Typography
              fontSize={{ xs: "11px", sm: "14px", md: "12px", lg: "14px" }}
              alignSelf="center"
              fontWeight={600}
            >
              {item.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
