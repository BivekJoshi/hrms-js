import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import BallotIcon from "@mui/icons-material/Ballot";

export const EmployTaskCard = ({ numberOfTask, nameOfTask }) => {
  return (
    <Box
      // border="1px solid black"
      borderRadius="2rem"
      boxShadow="7"
      textAlign="center"
      padding="1rem"
    >
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <BallotIcon sx={{ width: "2rem", height: "2rem" }} />
        <Typography fontSize="1rem" fontWeight="600">
          {nameOfTask}
        </Typography>
      </Stack>
      <Chip
        sx={{
          borderRadius: "2rem",
          border: "5px solid black",
          fontSize: "1.5rem",
          padding:"19px 0",
          marginTop:".5rem"
          
        }}
        label={numberOfTask}
        variant="outlined"
      />
    </Box>
  );
};
