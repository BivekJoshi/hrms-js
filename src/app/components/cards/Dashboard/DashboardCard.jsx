import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";

const DashboardCard = ({ title, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      <MainCard grow={true}>
        <Stack
          spacing={0.5}
          padding="1rem"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" color="#3e019b" align="center">
            {icon}
          </Typography>
          <Box>
            <Typography
              variant="h6"
              color={"light" ? "black" : "white"}
              align="center"
              fontWeight={600}
            >
              120
            </Typography>
            <Typography color="black" align="center">
              {title}
            </Typography>
          </Box>
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default DashboardCard;
