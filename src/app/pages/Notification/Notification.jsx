import React from "react";
import {
  Stack,
  Typography,
  List,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useGetEvent } from "../../hooks/event/useEvent";

const Notification = () => {
  const { data: events } = useGetEvent();

  const todayDate = new Date().toISOString().split("T")[0];

  const todayEvent = events?.filter((event) => event?.eventDate === todayDate);

  const notificationNumber = todayEvent?.length;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const btnStyle = {
    color: "#fff",
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={btnStyle}
      >
        <NotificationsIcon />{notificationNumber ? notificationNumber : ""}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack>
          <List>
            <MenuItem disablePadding>
              <Typography variant="h6" color="primary" fontWeight={400}>
                Today's Event:
              </Typography>
            </MenuItem>
            <Divider />
            {todayEvent
              ? todayEvent.map((item) => (
                  <MenuItem key={item.id}>
                    <ListItemText primary={item?.eventName} />
                  </MenuItem>
                ))
              : "No event for today!"}
          </List>
        </Stack>

        <Divider />
      </Menu>
    </Box>
  );
};

export default Notification;
