import React, { useState, useRef, useContext } from "react";
import { Typography, Popper, Grow } from "@mui/material";
import { Paper, Button, Box, ClickAwayListener, MenuList } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import {
  EventNotification,
  LeaveNotification,
} from "./Component/EventNotification";
import { useGetLeave } from "../../hooks/leave/useLeave";
import useAuth from "../../../auth/hooks/component/login/useAuth";

const Notification = ({ data }) => {
  const [status, setStatus] = useState();
  const { mode } = useContext(ThemeModeContext);
  //isManager
  const { isManager } = useAuth();
  const { data: leaveData } = useGetLeave();

  const eventName = data?.events;
  const eventCount = isManager
    ? leaveData?.length + data?.eventCount || 0
    : data?.eventCount || 0;
  const displayCount = eventCount > 0 ? eventCount : null;
  const pendingLeaveData = leaveData?.filter(
    (leave) => leave.leaveStatus === "PENDING"
  );
  console.log(pendingLeaveData);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const checkStatus = data?.isChecked ?? true;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    // setStatus(data?.isChecked = true)
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

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

  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const btnStyle = {
    color: "#fff",
  };

  return (
    <>
      <Box>
        <Button
          ref={anchorRef}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleToggle}
          style={btnStyle}
        >
          <NotificationsIcon />
          {status ? " " : displayCount}
        </Button>
        {eventCount !== 0 ? (
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={{ marginLeft: "-4rem" }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    {isManager ? (
                      <>
                        { pendingLeaveData.length > 0 ? (
                          <LeaveNotification
                            Eventname={"Leave Request"}
                            data={pendingLeaveData}
                            open={open}
                            handleClose={handleClose}
                            handleListKeyDown={handleListKeyDown}
                          />
                        ) : null}
                        {data.eventCount !== 0 && (
                          <EventNotification
                            Eventname={"Today's Event"}
                            data={eventName}
                            open={open}
                            handleClose={handleClose}
                            handleListKeyDown={handleListKeyDown}
                          />
                        )}
                      </>
                    ) : (
                      <EventNotification
                        Eventname={"Today's Event"}
                        data={eventName}
                        open={open}
                        handleClose={handleClose}
                        handleListKeyDown={handleListKeyDown}
                      />
                    )}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : (
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={{ width: { xs: "30%", lg: "15%" }, marginLeft: "-4rem" }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  background: mode === "light" ? "" : "#4d4c4c",
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
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
                      <Typography
                        variant="h6"
                        color={mode === "light" ? "primary" : "white"}
                        fontWeight={400}
                      >
                        No Events For Today !
                      </Typography>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </Box>
    </>
  );
};

export default Notification;
