import React, { useState, useRef } from "react";
import {
  MenuItem,
  Typography,
  Popper,
  Grow,
  Paper,
  Button,
  Box,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";

const Notification = ({ data }) => {
  const [ status, setStatus ] = useState();

  const eventName = data?.events;
  const eventCount = data?.eventCount || 0;
  const displayCount = eventCount > 0 ? eventCount : null;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);



  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setStatus(data?.isChecked ?? true)
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
          {status ? " " : displayCount }
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
                        Today's Events
                      </Typography>
                      {eventName &&
                        eventName.map((ename, index) => (
                          <MenuItem
                            key={index}
                            onClick={handleClose}
                            sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                          >
                            <Typography variant="h6">
                              {ename?.eventName}
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexDirection: "start", color: "gray" }}
                            >
                              <Typography>{ename?.eventTime}</Typography> &nbsp;
                              <Typography>{ename?.eventLocation}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                    </MenuList>
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
                      <Typography variant="h6" color="primary" fontWeight={400}>
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