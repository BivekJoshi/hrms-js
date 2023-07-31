import React from "react";

import { Box, Chip, Grid, List, ListItem } from "@mui/material";
import { Typography, Avatar } from "@mui/material";

import Male from "../../../../../../assets/male.png";
import Female from "../../../../../../assets/female.png";
import BasicInfo from "./BasicInfo";

const primaryColor = "#1c7ed6";

export const PersonalProfile = ({ data, photo }) => {

  return (
    <>
      <Grid
        sx={{
          bgcolor: "#cfe8fc",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          borderRadius: 5,
          alignItems: "center",
          p: "1rem",
          gap: "1rem",
        }}
      >
        <Box className="profileInfo">
          <Avatar
            sx={{
              width: 190,
              height: 190,
              bgcolor: primaryColor,
              alignSelf: "center",
            }}
            variant="circle"
              src={data?.gender === "MALE" ? Male : Female}
             // src={BASE_U}
          />
          <Typography
            sx={{
              color: primaryColor,
              fontSize: "1.3rem",
              fontWeight: "600",
            }}
          >
            {data?.firstName + " " + data?.middleName + " " + data?.lastName}
          </Typography>
          <Chip
            label={data?.position.positionName}
            sx={{ bgcolor: primaryColor, color: "white", width: " 9rem" }}
          />
          <Typography
            sx={{ color: primaryColor, fontSize: "1rem", fontWeight: "600" }}
          >
            {data?.officeEmail}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: "1rem", fontWeight: "600" }}
          >
            {data?.data?.addresses[0]?.city === null
              ? ""
              : data?.data?.addresses[0]?.city}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: "1rem", fontWeight: "600" }}
          >
            {data?.mobileNumber}
          </Typography>
        </Box>
        <BasicInfo data={data} />
      </Grid>
    </>
  );
};
