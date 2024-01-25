import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import useEventConfirmationForm from "../../../hooks/event/EventForm/useEventConfirmationForm";
import "./style.css";
import { getUser } from "../../../utils/cookieHelper";
import jwtDecode from "jwt-decode";

export const EventNotification = ({ data, handleClose }) => {
  const { mode, palette } = useContext(ThemeModeContext);
  const [showRemark, setShowRemark] = useState(false);
  const [error, setError] = useState(false);

  const { formik } = useEventConfirmationForm(data);
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRole;

  const handleButton = (response, eventId, notificationId) => {
    if (response === "NO" && !formik.values.remarks) {
      setError(true);
      return;
    }
    formik.setFieldValue("status", response);
    formik.setFieldValue("eventId", eventId);
    formik.setFieldValue("notificationId", notificationId);
    formik.handleSubmit();
    handleClose();
  };

  const getUpcomingDay = (eventDate) => {
    const eventDateObject = new Date(eventDate);
    const month = eventDateObject.toLocaleString("default", { month: "short" });
    const day = eventDateObject.getDate();
    return { day, month };
  };

  if (data?.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          maxHeight: "20rem",
          overflowY: "scroll",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ color: "#6DAB23" }}>
          No Events
        </Typography>
      </Box>
    );
  } else
    return (
      <Box
        sx={{
          textAlign: "center",
          maxHeight: "20rem",
          overflowY: "scroll",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ color: "#6DAB23" }}>
          Upcoming Events
        </Typography>

        {data &&
          data?.map((ename, index) => (
            <div
              key={index}
              style={{
                // backgroundColor: '#F7F8F9',
                backgroundColor: mode === "light" ? "#F7F8F9" : "#3e3e3e",
                padding: ".8rem",
                margin: ".5rem",
                borderRadius: "6px",
              }}
            >
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
                    {getUpcomingDay(ename?.eventDate).month}
                  </Typography>
                  <Typography
                    fontSize="11px"
                    textAlign="center"
                    bgcolor={mode === "light" ? "#fff" : ""}
                  >
                    {getUpcomingDay(ename?.eventDate).day}
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
                      {ename?.eventName}
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
                    <Typography fontSize="13px">
                      {ename?.eventTime} - Onwards
                    </Typography>
                  </div>
                </div>
                <div></div>
              </div>
              <Divider sx={{ marginTop: ".5rem" }} />
              <Grid display="flex" flexDirection="row" gap="8px" padding="5px">
                <LocationOnIcon fontSize="13px" />
                <Typography sx={{ maxWidth: "14rem", fontSize: "13px" }}>
                  <b>Location: </b>
                  {ename?.eventLocation}
                </Typography>
              </Grid>
              {userRole === "ROLE_EMPLOYEE" && (
                <div>
                  <Typography variant="h8" sx={{ fontWeight: 500 }}>
                    Are you attending?
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      sx={{
                        color: "green",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#2ab52a",
                          color: "#fff",
                        },
                      }}
                      startIcon={<DoneIcon />}
                      onClick={() =>
                        handleButton(
                          "OK",
                          ename?.eventId,
                          ename?.notificationId
                        )
                      }
                    >
                      Yes
                    </Button>
                    <Divider orientation="vertical" flexItem></Divider>
                    <Button
                      sx={{
                        color: "red",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#a52424",
                          color: "#fff",
                        },
                      }}
                      startIcon={<CloseIcon />}
                      onClick={() =>
                        setShowRemark({ ...showRemark, [index]: true })
                      }
                    >
                      No
                    </Button>
                  </div>
                  {showRemark?.[index] && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.1rem",
                      }}
                    >
                      <TextField
                        id="remarks"
                        name="remarks"
                        label="Remarks"
                        placeholder="Enter your remarks"
                        fullWidth
                        multiline
                        rows={2}
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        error={
                          error ||
                          (formik.touched.remarks &&
                            Boolean(formik.errors.remarks))
                        }
                        helperText={
                          (error && "Remarks are required") ||
                          (formik.touched.remarks && formik.errors.remarks)
                        }
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleButton(
                            "NO",
                            ename?.eventId,
                            ename?.notificationId
                          )
                        }
                        sx={{ marginTop: ".5rem" }}
                      >
                        <b>Submit</b>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </Box>
    );
};
