import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
// import Header from '../app/components/Header/Header';

const Applayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Box className="appBoxLayout">
        <Outlet />
      </Box>
    </>
  );
};

export default Applayout;
