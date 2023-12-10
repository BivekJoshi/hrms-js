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
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      lg={2}
      onClick={handleClick}
      style={{ flex: 1, width: "100%" }}
      borderRadius="10px"
    >
      <MainCard grow={true}>
        <Stack
          spacing={0.5}
          padding="1rem"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={mode === "light" ? "white" : "#3f413f"}
          borderRadius="10px"
        >
          <Typography
            variant="h4"
            sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            align="center"
          >
            {icon}
          </Typography>
          <Box>
            <Typography
              variant="h6"
              // color="black"
              align="center"
              fontWeight={600}
              color={mode === "light" ? "" : "white"}
            >
              {count}
            </Typography>
            <Typography align="center" color={mode === "light" ? "" : "white"}>
              {title}
            </Typography>
          </Box>
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default DashboardCard;
