// Header.js
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Stack } from "@mui/material";
import { CakeOutlined } from "@mui/icons-material";
import TodayBirthday from "../../pages/Birthday/TodayBirthday";
import {
  useGetUpcomingBirthday,
  useRemoveNotification,
} from "../../hooks/birthday/useBirthday";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 260px)`,
    marginLeft: "260px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }) {
  const [showLength, setShowLength] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [notificationClicked, setNotificationClicked] = useState(false);

  const handleClick = () => {
    setShowLength(false);
  };

  const today = new Date();
  const { data: upcomingBirthdayData, isloading } = useGetUpcomingBirthday();
  const thisMonth = today.getMonth();
  const thisDay = today.getDate();

  const thisDayBirthdays = upcomingBirthdayData
  ? upcomingBirthdayData
      .filter((employee) => {
        const dateOfBirth = new Date(employee.dateOfBirth);
        return (dateOfBirth.getMonth() === thisMonth && dateOfBirth.getDate() === thisDay);
      }) : [];

  const [openNotification, setOpenNotification] = useState(false);
  const isLoading = false;

  const { mutate } = useRemoveNotification();
  const handleChange = () => {
    setOpenNotification(!openNotification);
  };

  useEffect(() => {
    if (openNotification) {
      mutate();
    }
  }, [openNotification]);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Human Resource Management System
        </Typography>
        <div
          style={{
            Color: "white",
            display: "flex",
            position: "absolute",
            right: "100px",
            top: "30px",
            width: "30px",
          }}
        >
          <Badge
            color="success"
            onClick={handleClick}
            badgeContent={showLength ? thisDayBirthdays.length : null}
          >
            <CakeOutlined
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleChange}
              style={{ color: "white", cursor: "pointer" }}
            />
            
          </Badge>
            {openNotification && (
              <TodayBirthday
                data={thisDayBirthdays}
                isLoading={isLoading}
                open={openNotification}
                setOpen={setOpenNotification}
              />
            )}
        </div>
      </Toolbar>
    </AppBar>
  );
}