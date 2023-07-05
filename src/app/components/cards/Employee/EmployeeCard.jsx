import React, { useState, useEffect, useRef } from "react";
import { Email, LocalPhone } from "@mui/icons-material";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  ClickAwayListener,
  Grow,
  Stack,
} from "@mui/material";
import { MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image1 from "../../../../assets/wave.png";
import MainCard from "../MainCard";
import EmailModal from "../../../pages/Email/EmailModal";
const EmployeeCard = ({
  key,
  IsActive,
  EmployeeId,
  EFirstName,
  EMiddleName,
  ELastName,
  OfficeEmail,
  MobileNumber,
  Position
}) => {
  //dropdown menu
  const [open, setOpen] = useState(false);
  const [openEmailForm, setOpenEmailForm] = useState(false);

  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const navigate = useNavigate();
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
  const handleOpenEmailform = () => {
    setOpenEmailForm(true);
  };
  // const handleOpenEmail = (emailData) => {
  //   setEditEmail(emailData);
  //   // setOpenEditModal(true);
  // };
  const handleCloseEmailform = () => {
    setOpenEmailForm(false);
    console.log("hello");
  };
  return (
    // <Card
    //   key={key}
    //   sx={{
    //     p: 2,
    //     width: 300,
    //     backgroundColor: (theme) =>
    //       theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    //     cursor: "pointer",
    //   }}
    //   style={{
    //     textAlign: "center",
    //     padding: ".5rem",
    //   }}
    // >
    <>
      {/* {JSON.stringify(EmployeeId)} */}
      <MainCard grow={true}>
        <Box display="flex" justifyContent={"end"}>
          <Button
            style={{
              marginTop: "5px",
              fontSize: ".7rem",
              padding: "1px 5px",
            }}
            variant="outlined"
            color={(IsActive = "TRUE" ? "success" : "warning")}
          >
            {(IsActive = "TRUE" ? "Active" : "InActive")}
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
                        style={{ fontSize: ".8rem" }}
                      >
                        <MenuItem
                          onClick={() => {
                            navigate(`edit/${EmployeeId}`);
                            handleClose();
                          }}
                          style={{ fontSize: ".8rem" }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate(`${EmployeeId}`);
                            handleClose();
                          }}
                          style={{ fontSize: ".8rem" }}
                        >
                          View Profile
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
              <Chip label={Position} style={{ width: 230 }} />
            </Typography>
          </Box>
        </div>
        <div
          style={{
            fontSize: ".9rem",
          }}
        >
          <Box backgroundColor="#f5f5f5" padding=".5rem" borderRadius=".5rem">
            <Stack
              onClick={handleOpenEmailform}
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
      </MainCard>
      {openEmailForm && (
        <EmailModal
          officeEmail={OfficeEmail}
          employeeId={EmployeeId}
          open={openEmailForm}
          onClose={handleCloseEmailform}
          handleOpenEmailform={handleOpenEmailform}
        />
      )}
    </>
  );
};

export default EmployeeCard;
