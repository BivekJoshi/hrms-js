import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";

const DashboardCard = ({ title, icon, value }) => {
  const data = [ 12, 10, 20, 25 ]
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
            <Typography variant="h6" color="inherit" align="center" fontWeight={600}>
              {value}
            </Typography>
            <Typography color="inherit" align="center">
              {title}
            </Typography>
          </Box>
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default DashboardCard;
