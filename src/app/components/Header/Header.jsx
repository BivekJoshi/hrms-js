import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import {
  useGetUpcomingBirthday,
  useRemoveNotification,
} from "../../hooks/birthday/useBirthday";
import Notification from "../../pages/Notification/Notification";
import Profile from "../../pages/Auth/Profile/Profile";

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

  const handleClick = () => {
    setShowLength(false);
  };

  const today = new Date();
  const { data: upcomingBirthdayData, isloading } = useGetUpcomingBirthday();
  const thisMonth = today.getMonth();
  const thisDay = today.getDate();

  const thisDayBirthdays = upcomingBirthdayData
    ? upcomingBirthdayData.filter((employee) => {
        const dateOfBirth = new Date(employee.dateOfBirth);
        return (
          dateOfBirth.getMonth() === thisMonth &&
          dateOfBirth.getDate() === thisDay
        );
      })
    : [];

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
      <Toolbar
        sx={{
          display: "felx",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Human Resource Management System
          </Typography>
        </Box>

        <Stack flexDirection="row">
          <Typography>
            <Notification data={thisDayBirthdays} />
          </Typography>
          <Typography>
            <Profile />
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}