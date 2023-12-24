import { Box, ClickAwayListener, Divider, Grow, MenuItem } from "@mui/material";
import { MenuList, Paper, Popper, Typography } from "@mui/material";
import React from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
                    <div
                      style={{
                        backgroundColor: "rgb(215, 64, 52)",
                        padding: ".1rem 1rem",
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
                        padding: ".1rem .8rem",
                        fontWeight: "bold",
                        borderRadius: "6px",
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
                        gap: ".5rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "red",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <Typography variant="h7" sx={{ fontWeight: 600 }}>
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
                      <Typography variant="h7">
                        {ename?.eventTime} - Onwards
                      </Typography>
                    </div>
                  </div>
                  <div></div>
                </div>
                <Divider sx={{ marginTop: ".5rem" }} />
                <div style={{ maxWidth: "15rem" ,display:"flex",alignItems:'center'}}>
                <LocationOnIcon/>
                  <Typography variant="h7"><b>Location :</b>{ename?.eventLocation}</Typography>
                </div>

                <br />
                <Typography variant="h7" sx={{ fontWeight: 500 }}>
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
                    variant="h6"
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
                    variant="h6"
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
