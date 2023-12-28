import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThemeModeContext from "../../../theme/ThemeModeContext";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useGetEventNotification } from "../../hooks/event/useEvent";

const getUpcomingDay = (eventDate) => {
  const eventDateObject = new Date(eventDate);
  const month = eventDateObject.toLocaleString("default", { month: "short" });
  const day = eventDateObject.getDate();
  return { day, month };
};

const EventList = ({}) => {
  const { mode, palette } = useContext(ThemeModeContext);
  const [openIndex, setOpenIndex] = useState(null);

  const { data: eventData } = useGetEventNotification();

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      <Box sx={{ padding: ".5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {eventData?.events?.map((eData, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "rgb(249, 224, 222)",
                  padding: ".3rem",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{ display: "flex", gap: ".5rem" }}
                  onClick={() => handleClick(index)}
                >
                  <div
                    style={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        style={{
                          backgroundColor: palette.primary.main,
                          padding: "1px 8px",
                          color: "#fff",
                          borderRadius: "6px 6px 0 0",
                        }}
                        fontSize="15px"
                      >
                        {getUpcomingDay(eData?.eventDate).month}
                      </Typography>
                      <Typography
                        fontSize="15px"
                        textAlign="center"
                        bgcolor={mode === "light" ? "#fff" : ""}
                      >
                        {getUpcomingDay(eData?.eventDate).day}
                      </Typography>
                    </div>
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
                          width: "13px",
                          height: "13px",
                          borderRadius: "50%",
                          padding: ".2rem",
                        }}
                      ></div>
                      <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                        {eData?.eventName}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <AccessTimeIcon
                        style={{ width: "13px", height: "13px" }}
                      />
                      <Typography fontSize="13px">9pm Onwards</Typography>
                    </div>
                  </div>
                </div>

                {openIndex === index && (
                  <div style={{ padding: ".2rem" }}>
                    <Paper elevation={3} sx={{ padding: ".3rem" }}>
                      <Typography variant="h5">{eData?.userName}</Typography> <DoneIcon /> <CloseIcon />
                      <Divider />
                      Dhiraj Joshi <DoneIcon /> <CloseIcon />
                    </Paper>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

export default EventList;
