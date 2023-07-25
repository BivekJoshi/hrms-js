import { Box, Stack, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import "../Style/ProjectProgressStyle.css";

import React from "react";

export const ProjectProgressCard = ({ projectDataCount }) => {
  const BorderLinearProgress = ({ color, ...props }) => {
    return (
      <LinearProgress
        {...props}
        variant="determinate"
        style={{
          height: ".7rem",
          borderRadius: 18,
          backgroundColor: "white",
        }}
        sx={{
          "& .MuiLinearProgress-bar": {
            borderRadius: ".5rem",
            backgroundColor: color || "#FF4646",
          },
        }}
      />
    );
  };
  return (
    <>
      {/* {projectDataCount?.total > 0 && ( */}
      <Box className="projectProgress">
        <Box className="progressBox" bgcolor="#306ED9">
          <Typography sx={{ fontWeight: 600, fontSize: "1.3rem" }}>
            {" "}
            Total Project{" "}
          </Typography>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            marginTop="1rem"
          >
            <Typography>{projectDataCount?.total}</Typography>
            <Typography>
              {Math.ceil(
                (projectDataCount?.total / projectDataCount?.total) * 100
              )}
              %
            </Typography>
          </Stack>
          <BorderLinearProgress
            variant="determinate"
            value={(projectDataCount?.total / projectDataCount?.total) * 100}
            // color="#33d77a"
          />
        </Box>
        <Box className="progressBox" bgcolor="#33D77A">
          <Typography sx={{ fontWeight: 600, fontSize: "1.3rem" }}>
            Completed{" "}
          </Typography>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            marginTop="1rem"
          >
            <Typography> {projectDataCount?.completed}</Typography>
            <Typography>
              {Math.ceil(
                (projectDataCount?.completed / projectDataCount?.total) * 100
              )}
              %
            </Typography>
          </Stack>
          <BorderLinearProgress
            variant="determinate"
            value={(projectDataCount?.pending / projectDataCount?.total) * 100}
            // color="#e8c315 "
          />
        </Box>
        <Box className="progressBox" bgcolor="#e8c315">
          <Typography sx={{ fontWeight: 600, fontSize: "1.3rem" }}>
            Pending{" "}
          </Typography>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            marginTop="1rem"
          >
            <Typography> {projectDataCount?.pending}</Typography>
            <Typography>
              {Math.ceil(
                (projectDataCount?.pending / projectDataCount?.total) * 100
              )}
              %
            </Typography>
          </Stack>
          <BorderLinearProgress
            // color="#F68828"
            variant="determinate"
            value={(projectDataCount?.pending / projectDataCount?.total) * 100}
          />
        </Box>
        <Box className="progressBox" bgcolor="#F68828">
          <Typography sx={{ fontWeight: 600, fontSize: "1.3rem" }}>
            Work In Progress
          </Typography>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            marginTop="1rem"
          >
            <Typography> {projectDataCount?.workInProgress}</Typography>
            <Typography>
              {Math.ceil(
                (projectDataCount?.workInProgress / projectDataCount?.total) *
                  100
              )}
              %
            </Typography>
          </Stack>
          <BorderLinearProgress
            // color="#80abf6"
            variant="determinate"
            value={
              (projectDataCount?.workInProgress / projectDataCount?.total) * 100
            }
          />
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
