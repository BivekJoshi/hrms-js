import React, { useState, useRef } from "react";
import { Button, Box, Popper, Grow, Paper } from "@mui/material";
import { MenuItem, ClickAwayListener, MenuList, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import "../Style/Style.css";

const TodayBirthday = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const birthdayEmployeeName = data?.birthdayEmployees;
  const birthdayEmployeeCount = data?.birthdayEmployeeCount || 0;
  const displayCount = birthdayEmployeeCount > 0 ? birthdayEmployeeCount : null;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
    <Box>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={btnStyle}
      >
        <CakeIcon />
        {data?.isChecked ? "" : displayCount}
      </Button>
      {birthdayEmployeeCount !== 0 ? (
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
                      Today's Birthday
                    </Typography>
                    {birthdayEmployeeName &&
                      birthdayEmployeeName.map((bname, index) => (
                        <MenuItem
                          key={index}
                          onClick={handleClose}
                          sx={{ justifyContent: "center" }}
                        >
                          {bname.fullName}
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
                      No One Birthday !
                    </Typography>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default TodayBirthday;