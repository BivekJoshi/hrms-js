import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import main from "../../../../assets/main.png";

const InitialPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40vh",
          height: "40vh",
          margin: "0 auto",
        }}
      >
        <img src={main} alt="image" />
      </Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          paddingLeft: "10vh",
          paddingRight: "10vh",
          textAlign: "justify",
          color: "grey",
          WebkitTextStroke: "1px navy",
        }}
      >
        DigiHub has been introduced in Nepal to provide a single solution
        FinTech service to all required organizations including banks and
        financial institutions, central bank, and the Government of Nepal.
        DigiHub, Nepal has an ultimate vision of achieving ‘Digitized Nepal’ by
        making DigiHub, Nepal itself as “A Pioneer FinTech and Management
        Solutions Knowledge Hub” in the country.
      </Typography>
      <br />
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30vh",
          height: "30vh",
          margin: "0 auto",
        }}
      >
        <img src={hrmslogo} alt="image" />
      </Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          paddingLeft: "10vh",
          paddingRight: "10vh",
          textAlign: "justify",
          color: "grey",
          WebkitTextStroke: "1px navy",
        }}
      >
        Human Resource Management System, which is a software application or
        suite of applications designed to streamline and automate various HR
        functions within an organization. HRMS systems are used by HR
        professionals to manage employee data, track employee performance,
        administer benefits, and handle other HR-related tasks efficiently.
      </Typography> */}
    </>
  );
};

export default InitialPage;
