import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <Container maxWidth="1736px">
        <Box className="appBoxLayout">
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Applayout;
