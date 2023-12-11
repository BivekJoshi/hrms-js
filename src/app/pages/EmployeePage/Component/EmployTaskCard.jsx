import { Box, Chip, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import BallotIcon from "@mui/icons-material/Ballot";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

export const EmployTaskCard = ({ numberOfTask, nameOfTask, taskIcon }) => {
  const { mode } = useContext(ThemeModeContext);

  return (
    <Box
      bgcolor={mode === "light" ? "" : "#3f413f"}
      borderRadius="10px"
      boxShadow="7"
      textAlign="center"
      padding="1rem"
    >
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        color={mode === "light" ? "#6DAB23" : "white"}
      >
        {taskIcon}
        <Typography fontSize="1rem" fontWeight="600">
          {nameOfTask}
        </Typography>
      </Stack>
      <Chip
        sx={{
          borderRadius: "2rem",
          border: mode === "light" ? "5px solid #6DAB23" : "5px solid white",
          fontSize: "1.5rem",
          padding: "19px 0",
          marginTop: ".5rem",
        }}
        label={numberOfTask}
        variant="outlined"
      />
    </Box>
  );
};
