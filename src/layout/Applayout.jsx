import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <Box className="appBoxLayout">
        <Outlet />
      </Box>
    </>
  );
};

export default Applayout;
