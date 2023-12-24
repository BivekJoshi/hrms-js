import { Box, ClickAwayListener, Divider, Grow, MenuItem } from "@mui/material";
import { MenuList, Paper, Popper, Typography } from "@mui/material";
import React from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const EventNotification = ({
  Eventname,
  data,
  open,
  handleClose,
  handleListKeyDown,
}) => {
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
        }}
      >
        {/* <Typography variant='h7' color='primary' fontWeight={400}>
          {Eventname}
        </Typography>
        {data &&
          data.map((ename, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <Typography variant='h7'>{ename?.eventName}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'start',
                  color: 'gray',
                }}
              >
                <Typography>{ename?.eventTime}</Typography> &nbsp;
                <Typography>{ename?.eventLocation}</Typography>
              </Box>
            </MenuItem>
          ))} */}
        <Typography variant="h5" sx={{ color: "#6DAB23" }}>
          Today's Event
        </Typography>

        <Box
          sx={{
            backgroundColor: "#F7F8F9",
            padding: ".8rem",
            margin: ".5rem",
            borderRadius: "6px",
          }}
        >
          {data &&
            data.map((ename, index) => (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "6px 6px 0 0",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgb(215, 64, 52)",
                        padding: ".2rem 1.4rem",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "6px 6px 0 0",
                      }}
                    >
                      Dec
                    </div>
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: ".2rem 1.4rem",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography variant="h5">25</Typography>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "red",
                          width: "13px",
                          height: "13px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                      <AccessTimeIcon />
                      <Typography variant="h6">{ename?.eventTime} - Onwards</Typography>
                    </div>
                  </div>
                  <div></div>
                </div>
                <Divider sx={{ marginTop: ".5rem" }} />
                <Typography variant="h6" sx={{ maxWidth: "25rem" }}>
                {ename?.eventLocation}
                </Typography>
                <br />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Are you attending?
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "green",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                      cursor: "pointer",
                    }}
                  >
                    <DoneIcon /> Yes
                  </Typography>
                  <Divider orientation="vertical" flexItem></Divider>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "red",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon /> No
                  </Typography>
                </div>
              </>
            ))}
        </Box>
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
