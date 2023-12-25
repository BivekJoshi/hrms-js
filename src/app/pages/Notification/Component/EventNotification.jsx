import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  MenuItem,
} from "@mui/material";
import { MenuList, Paper, Popper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import useEventConfirmationForm from "../../../hooks/event/EventForm/useEventConfirmationForm";

export const EventNotification = ({
  data,
  open,
  handleClose,
  handleListKeyDown,
}) => {
  const { mode, palette } = useContext(ThemeModeContext);

  const { formik } = useEventConfirmationForm(data);

  const handleButton = (response, eventId, notificationId) => {
    formik.setFieldValue("status", response);
    formik.setFieldValue("eventId", eventId);
    formik.setFieldValue("notificationId", notificationId);
    formik.handleSubmit();
  };

  const getUpcomingDay = (eventDate) => {
    const eventDateObject = new Date(eventDate);
    const month = eventDateObject.toLocaleString("default", { month: "short" });
    const day = eventDateObject.getDate();
    return { day, month };
  };

  return (
    <>
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={handleListKeyDown}
        sx={{
          textAlign: "center",
          padding: "1rem 1rem",
          maxHeight:"25rem",
          overflowY:"scroll"
        }}
      >
        <Typography variant="h6" sx={{ color: "#6DAB23" }}>
          Comming Event
        </Typography>

        {data &&
          data.map((ename, index) => (
            <>
            {ename.notificationId !== "1" && (
              <Box
                sx={{
                  backgroundColor: "#F7F8F9",
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
                      <AccessTimeIcon
                        style={{ width: "13px", height: "13px" }}
                      />
                      <Typography fontSize="13px">
                        {ename?.eventTime} - Onwards
                      </Typography>
                    </div>
                  </div>
                  <div></div>
                </div>
                <Divider sx={{ marginTop: ".5rem" }} />
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  padding="5px"
                >
                  <LocationOnIcon fontSize="13px" />
                  <Typography sx={{ maxWidth: "14rem", fontSize: "13px" }}>
                    <b>Location: </b>{ename?.eventLocation}
                  </Typography>
                </Grid>
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
                    }}
                    startIcon={<DoneIcon />}
                    onClick={() =>
                      handleButton(
                        "YES",
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
                    }}
                    startIcon={<CloseIcon />}
                    onClick={() =>
                      handleButton(
                        "NO",
                        ename?.eventId,
                        ename?.notificationId
                      )
                    }
                  >
                    No
                  </Button>
                </div>
              </Box>
            )}
            </>
          ))}
      </MenuList>
    </>
  );
};
export const LeaveNotification = ({
  Eventname,
  data,
  open,
  handleClose,
  handleListKeyDown,
}) => {
  const { data: employeeData } = useGetEmployee();

  const getEmployeeName = (employeeId) => {
    const employee = employeeData?.find((emp) => emp.id === employeeId);

    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName || ""
    }`;
    return name;
  };

  return (
    <>
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={handleListKeyDown}
        sx={{
          textAlign: "center",
          padding: "0.5rem 1rem",
        }}
      >
        <Typography variant="h6" color="primary" fontWeight={400}>
          {Eventname}
        </Typography>
        {data &&
          data.map((ename, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link
                to="/admin/leave"
                style={{ textDecoration: "none", fontSize: "1rem" }}
              >
                {getEmployeeName(ename.employeeId)}
              </Link>
            </MenuItem>
          ))}
      </MenuList>
    </>
  );
};
