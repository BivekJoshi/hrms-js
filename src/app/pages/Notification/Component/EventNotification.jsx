import { Box, ClickAwayListener, Grow, MenuItem } from "@mui/material";
import { MenuList, Paper, Popper, Typography } from "@mui/material";
import React from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Link } from "react-router-dom";

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
              <Typography variant="h6">{ename?.eventName}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "start",
                  color: "gray",
                }}
              >
                <Typography>{ename?.eventTime}</Typography> &nbsp;
                <Typography>{ename?.eventLocation}</Typography>
              </Box>
            </MenuItem>
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
