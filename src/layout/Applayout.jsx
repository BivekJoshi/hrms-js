import { Box, Container } from "@mui/material";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ThemeModeContext from "../theme/ThemeModeContext";

const Applayout = () => {
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context

  return (
    <>
      <Box
        className="appBoxLayout"
        sx={mode === "light" ? { backgroundColor: "white" } : { backgroundColor: "#292929" }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Applayout;
