import React, { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, icon, count, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkTo);
  };
  
  const { mode } = useContext(ThemeModeContext);

  return (
    <Grid item xs={12} sm={6} md={3} lg={2} onClick={handleClick}>
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
              color="black" 
              align="center"
              fontWeight={600}
            >
              {count}
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