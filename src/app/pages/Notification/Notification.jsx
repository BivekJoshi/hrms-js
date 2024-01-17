import React, { useState, useRef, useContext } from "react";
import { Typography, Grow, IconButton, Tooltip } from "@mui/material";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import { MenuList } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { EventNotification } from "./Component/EventNotification";
import useAuth from "../../../auth/hooks/component/login/useAuth";
import { LeaveNotification } from "./Component/LeaveNotification";

const Notification = ({ data }) => {
  const { isManager } = useAuth();

  const { mode } = useContext(ThemeModeContext);

  const eventCount = data?.events?.length || 0;

  const filteredEvents = data?.events?.filter(
    (event) => event.notificationId === "0"
  );

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  return (
    <Box>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        style={{ color: "#fff" }}
      >
        <Tooltip title="Notifications">
          <Badge badgeContent={eventCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      {data?.event?.length !== 0 ? (
        <Menu
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
          TransitionComponent={Grow}
          disablePortal
          sx={{ padding: "0px !important" }}
        >
          {isManager ? (
            <>
              <LeaveNotification
                Eventname={"Leave Request"}
                handleClose={handleClose}
                handleListKeyDown={handleListKeyDown}
              />
              <EventNotification
                Eventname={"Today's Event"}
                data={filteredEvents}
                handleClose={handleClose}
                handleListKeyDown={handleListKeyDown}
              />
            </>
          ) : (
            <MenuItem>
              <EventNotification
                Eventname={"Today's Event"}
                data={filteredEvents}
                handleClose={handleClose}
                handleListKeyDown={handleListKeyDown}
              />
            </MenuItem>
          )}
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
          TransitionComponent={Grow}
          disablePortal
          style={{ width: { xs: "30%", lg: "15%" }, marginLeft: "-4rem" }}
        >
          <MenuList
            autoFocusItem={open}
            id="composition-menu"
            aria-labelledby="composition-button"
            onKeyDown={handleListKeyDown}
            sx={{
              textAlign: "center",
              width: "100%",
              padding: "1rem 2rem",
            }}
          >
            <MenuItem>
              <Typography
                variant="h7"
                color={mode === "light" ? "primary" : "white"}
              >
                No Events For Today!
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default Notification;
