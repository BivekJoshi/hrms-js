import React, { useState, useEffect, useRef } from "react";
import { Email, LocalPhone } from "@mui/icons-material";
import { Box, Button, Card, CardMedia, Chip, ClickAwayListener, Grow, Stack } from "@mui/material";
import { MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image1 from "../../../../assets/wave.png";

const EmployeeCard = ({
  key,
  IsActive,
  EmployeeId,
  EFirstName,
  EMiddleName,
  ELastName,
  OfficeEmail,
  MobileNumber,
}) => {
  //dropdown menu
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

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

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Card
      key={key}
      sx={{
        p: 2,
        width: 265,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        cursor: "pointer",
      }}
      style={{
        textAlign: "center",
        padding: ".5rem",
      }}
    >
      <Box display="flex" justifyContent={"end"}>
        <Button 
          style={{
            marginTop: "5px",
            fontSize: ".7rem",
            padding: "1px 5px",
          }}
          variant="outlined"
          color={IsActive === true ? "success" : "warning"}
        >
          {IsActive === true ? "IsActive" : "InActive"}
        </Button>
        <Box>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreHorizIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
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
                    >
                      <MenuItem onClick={handleClose}>
                        <NavLink to={`edit/${EmployeeId}`} style={{textDecoration:"none", color:"black", fontSize:".8rem"}}>
                        Edit
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to={`${EmployeeId}`} style={{textDecoration:"none", color:"black", fontSize:".8rem"}}>
                        View Profile
                        </NavLink>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Box>
      <div style={{ textAlign: " -webkit-center", marginTop: "1rem" }}>
        <CardMedia
          component="img"
          src={Image1}
          alt="Paella dish"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
      </div>
      <div>
        <p style={{ fontWeight: 700, margin: "1rem 0", fontSize: "20px" }}>
          {EFirstName} {EMiddleName} {ELastName}
        </p>
        <Box padding={"0 1rem"}>
          <Typography variant="body2" gutterBottom>
            <Chip label="Intern" style={{ width: 230 }} />
          </Typography>
        </Box>
      </div>
      <div
        style={{
          fontSize: ".9rem",
          // padding: ".5rem",
        }}
      >
        <Box backgroundColor="#f5f5f5" padding=".5rem" borderRadius=".5rem">
          <Stack
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
          >
            <Email />
            <p style={{ margin: "10px 0" }}>{OfficeEmail}</p>
          </Stack>

          <Stack
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
          >
            <LocalPhone />
            <p style={{ margin: "10px 0" }}> {MobileNumber}</p>
          </Stack>
        </Box>
      </div>
    </Card>
  );
};

export default EmployeeCard;
