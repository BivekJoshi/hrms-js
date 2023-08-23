import React, { useState, useEffect, useRef, useContext } from "react";
import { Email, LocalPhone } from "@mui/icons-material";
import { Box, Button, CardMedia } from "@mui/material";
import { Chip, ClickAwayListener, Grow, Stack } from "@mui/material";
import { MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Male from "../../../../assets/male.png";
import Female from "../../../../assets/female.png";
import MainCard from "../MainCard";
import EmailModal from "../../../pages/Email/EmailModal";
import { EditDeactivationEmployeeModal } from "../../../pages/Employee/EmployeeDeactivationModal/EditDeactivationEmployeeModal";
import ProgressbyAll from "../../../pages/Employee/ProgressEmployeeData/ProgressbyAll";
import PopOver from "../../../../theme/overrides/PopOver";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { DOC_URL } from "../../../../auth/axiosInterceptor";

const EmployeeCard = ({
  IsActive,
  EmployeeId,
  EFirstName,
  EMiddleName,
  ELastName,
  OfficeEmail,
  MobileNumber,
  PositionName,
  PositionLevel,
  EGender,
  ProgressBarRes,
  employeePhoto,
}) => {
  const [open, setOpen] = useState(false);
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context
  const img = DOC_URL + employeePhoto;

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
  const handleCloseEmailform = () => {
    setOpenEmailForm(false);
  };

  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const handleCloseDeactivateModal = () => setOpenDeactivateModal(false);
  const handleClick = () => {
    setOpenDeactivateModal(true);
  };

  return (
    <>
      <Box>
        <MainCard
          grow={true}
          style={{
            textAlign: "center",
            padding: "1.5rem",
            backgroundColor: mode === "light" ? "white" : "#292929",
          }}
        >
          <Box display="flex" justifyContent={"end"}>
            <PopOver
              triggerContent={
                <Button
                  style={{
                    marginTop: "5px",
                    fontSize: ".7rem",
                    padding: "1px 5px",
                  }}
                  onClick={handleClick}
                  variant="outlined"
                  color={(IsActive = true ? "success" : "warning")}
                >
                  {(IsActive = true ? "Active" : "InActive")}
                </Button>
              }
              popoverContent={
                <Typography sx={{ p: 1 }}>Inactive Employee</Typography>
              }
            />

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
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
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
          <Stack
            style={{
              textAlign: " -webkit-center",
              marginTop: "1rem",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src={
                employeePhoto
                  ? img
                  : EGender === "MALE"
                  ? Male
                  : ""
                  ? Female
                  : Female
              }
              alt="Paella dish"
              sx={{ width: 66, height: 66, borderRadius: "2rem" }}
            />
          </Stack>

          <PopOver
            triggerContent={<ProgressbyAll ProgressbyAll={ProgressBarRes} />}
            popoverContent={
              <Typography sx={{ p: 1 }}>Information Progress Data</Typography>
            }
          />

          <Stack>
            <Typography
              style={{ fontWeight: 700, margin: "1rem 0", fontSize: "20px" }}
            >
              <Chip
                sx={{
                  bgcolor: mode === "light" ? "white" : "rgb(41, 41, 41)",
                  fontSize: "1rem",
                  width: "80%",
                }}
                label={
                  <h3 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {EFirstName || ""} {EMiddleName || ""} {ELastName || ""}
                  </h3>
                }
              />
              {/* {EFirstName} {EMiddleName} {ELastName} */}
            </Typography>
            <Box padding={"0 1rem"}>
              <Typography variant="body2" gutterBottom>
                <PopOver
                  triggerContent={
                    <Chip
                      label={`${PositionName || ""} (${PositionLevel || ""})`}
                      style={{ width: 230 }}
                    />
                  }
                  popoverContent={
                    <Typography sx={{ p: 1 }}>{`${PositionName || ""} (${
                      PositionLevel || ""
                    })`}</Typography>
                  }
                />
              </Typography>
            </Box>
          </Stack>
          <Stack
            style={{
              fontSize: ".9rem",
            }}
          >
            <Box
              backgroundColor={mode === "light" ? "#f5f5f5" : "#4d4c4c"}
              padding=".5rem"
              borderRadius=".5rem"
            >
              <PopOver
                triggerContent={
                  <Stack
                    onClick={handleOpenEmailform}
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <Email />
                    <Typography variant="p" style={{ margin: "10px 0" }}>
                      {OfficeEmail || ""}
                    </Typography>
                  </Stack>
                }
                popoverContent={
                  <Typography sx={{ p: 1 }}>
                    Send Email To {EFirstName || ""} {EMiddleName || ""}{" "}
                    {ELastName || ""}
                  </Typography>
                }
              />

              <Stack
                spacing={{ xs: 1 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
              >
                <LocalPhone />
                <Typography variant="p" style={{ margin: "10px 0" }}>
                  {" "}
                  {MobileNumber || ""}{" "}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </MainCard>
        {openEmailForm && (
          <EmailModal
            officeEmail={OfficeEmail || ""}
            employeeId={EmployeeId}
            open={openEmailForm}
            onClose={handleCloseEmailform}
            handleOpenEmailform={handleOpenEmailform}
          />
        )}
      </Box>

      {openDeactivateModal && (
        <EditDeactivationEmployeeModal
          id={EmployeeId}
          open={openDeactivateModal}
          handleCloseModal={handleCloseDeactivateModal}
        />
      )}
    </>
  );
};

export default EmployeeCard;
