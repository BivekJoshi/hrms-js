import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Typography,
  Popper,
  Grow,
  IconButton,
  Tooltip,
  Badge,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Paper, ClickAwayListener, MenuList } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import {
  EventNotification,
  LeaveNotification,
} from "./Component/EventNotification";
import { useGetLeave } from "../../hooks/leave/useLeave";
import useAuth from "../../../auth/hooks/component/login/useAuth";

const Notification = ({ data }) => {
  const { isManager } = useAuth();
  const { data: leaveData } = useGetLeave();
  const { mode } = useContext(ThemeModeContext);

  const eventName = data?.events;

  //leave notifications
  const pendingLeaveData = isManager
    ? leaveData?.filter((leave) => leave.leaveStatus === "PENDING")
    : "";
  const eventCount = isManager
    ? pendingLeaveData?.length + data?.eventCount || 0
    : data?.events?.length || 0;

  const filteredEvents = data?.events?.filter(
    (event) => event.notificationId === "0"
  );
  const filterEventcount = filteredEvents?.length;

  const displayCount = eventCount > 0 ? eventCount : null;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const checkStatus = data?.isChecked ? true : false;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    //setstatus (data?.ischecked = true)
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

  // useEffect(() => {
  //   // checks if target click is outside Popper
  //   const handleClickOutside = (event) => {
  //     // anchorRef refers icon button triggering the Popper
  //     if (anchorRef.current && !anchorRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const btnStyle = {
    color: "#fff",
  };

  return (
    <Box>
      <IconButton ref={anchorRef} onClick={handleToggle} style={btnStyle}>
        <Tooltip title="Notifications">
          <Badge
            // badgeContent={data?.isChecked ? "" : displayCount}
            badgeContent={data?.isChecked ? "" : filterEventcount}
            color="secondary"
          >
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
          sx={{padding:"0px"}}
        >
          {isManager ? (
            <>
              {pendingLeaveData?.length > 0 ? (
                <LeaveNotification
                  Eventname={"Leave Request"}
                  data={pendingLeaveData}
                  handleClose={handleClose}
                  handleListKeyDown={handleListKeyDown}
                />
              ) : null}
              <EventNotification
                Eventname={"Today's Event"}
                data={eventName}
                handleClose={handleClose}
                handleListKeyDown={handleListKeyDown}
              />
            </>
          ) : (
            <MenuItem>
              <EventNotification
                Eventname={"Today's Event"}
                data={eventName}
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
