import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import {
  useGetTodayBirthday,
  useGetUpcomingBirthday,
  useRemoveNotification,
} from "../../hooks/birthday/useBirthday";
import Notification from "../../pages/Notification/Notification";
import Profile from "../../pages/Auth/Profile/Profile";
import { toast } from "react-toastify";
import TodayBirthday from "../../pages/Birthday/TodayBirthday";
import { useGetEventNotification } from "../../hooks/event/useEvent";

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
  const { data: birthdayData } = useGetTodayBirthday();
  const { data : eventData } = useGetEventNotification();
  const [showLength, setShowLength] = useState(true);
  const [openNotification, setOpenNotification] = useState(false);
  const [clearedNotification, setClearedNotification] = useState(false);

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
            <TodayBirthday data={birthdayData} />
            <Notification data={eventData} />
            <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
