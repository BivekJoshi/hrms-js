import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const EventList = () => {
  const { mode, palette } = useContext(ThemeModeContext);

  return (
    <Box
      sx={{
        backgroundColor: "rgb(222, 247, 223)",
        height: "100%",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#388E3C",
        }}
      >
        <b>Event List</b>
      </Typography>
      <Box sx={{ backgroundColor: "rgb(249, 224, 222)", padding: ".5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "6px",
            }}
          >
            <Typography
              style={{
                backgroundColor: palette.primary.main,
                padding: "1px 8px",
                color: "#fff",
                borderRadius: "6px 6px 0 0",
              }}
              fontSize="11px"
            >
              Dec
            </Typography>
            <Typography
              fontSize="11px"
              textAlign="center"
              bgcolor={mode === "light" ? "#fff" : ""}
            >
              23
            </Typography>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                Crismas
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <AccessTimeIcon style={{ width: "13px", height: "13px" }} />
              <Typography fontSize="13px">Onwards</Typography>
            </div>
          </div>
          <div></div>
        </div>
      </Box>
    </Box>
  );
};

export default EventList;
