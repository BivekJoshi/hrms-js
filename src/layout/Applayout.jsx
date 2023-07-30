import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <Box className="appBoxLayout">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Applayout;
