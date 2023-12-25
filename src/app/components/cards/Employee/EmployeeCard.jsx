import React, { useState, useEffect, useRef, useContext } from "react";
import { Email, LocalPhone } from "@mui/icons-material";
import { Box, Button, CardMedia, Tooltip } from "@mui/material";
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
import useAuth from "../../../../auth/hooks/component/login/useAuth";

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
  const { isEmployee } = useAuth();
  const [open, setOpen] = useState(false);
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context
  // console.log({"doc": DOC_URL, "emp": employeePhoto})
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
            {isEmployee ? (
              ""
            ) : (
              <>
                <Button
                  style={{
                    marginTop: "5px",
                    fontSize: ".7rem",
                    padding: "1px 5px",
                  }}
                  onClick={handleClick}
                  variant="outlined"
                  color={IsActive ? "success" : "warning"}
                >
                  {IsActive ? "Terminate" : "Active"}
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
              </>
            )}
          </Box>
          <Stack
            style={{
              textAlign: " -webkit-center",
              marginTop: "1rem",
              alignItems: "center",
            }}
          ></Stack>
          <div style={{ paddingTop: "16px" }}>
            {ProgressBarRes && <ProgressbyAll ProgressbyAll={ProgressBarRes} />}
          </div>

          <Stack>
          
          <CardMedia
          component="img"
          src={img ? img : Male}
          alt="Img"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
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
                  <Typography
                    variant="h6"
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {EFirstName || ""} {EMiddleName || ""} {ELastName || ""}
                  </Typography>
                }
              />
            </Typography>
            <Box padding={"0 1rem"}>
              <Typography variant="body2" gutterBottom>
                <Tooltip title={PositionLevel || ""}>
                  <Chip
                    style={{ width: 230 }}
                    label={
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >{`${PositionName || ""} `}</p>
                    }
                  />
                </Tooltip>
              </Typography>
            </Box>
          </Stack>
          {isEmployee ? (
            ""
          ) : (
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
                <Tooltip
                  title={`Send Email To ${EFirstName || ""} ${
                    EMiddleName || ""
                  } ${ELastName || ""}`}
                >
                  <Stack
                    onClick={handleOpenEmailform}
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <Email sx={{ fontSize: "1.2rem" }} />
                    <Chip
                      sx={{
                        bgcolor: mode === "light" ? "#f5f5f5" : "#4d4c4c",
                        fontSize: "1rem",
                        width: "80%",
                        justifyContent: "flex-start",
                        padding: "0",
                      }}
                      label={
                        <Typography
                          variant="p"
                          style={{
                            margin: "10px 0 0 -12px",
                            fontSize: ".85rem",
                          }}
                        >
                          {OfficeEmail || ""}
                        </Typography>
                      }
                    />
                  </Stack>
                </Tooltip>

                <Stack
                  spacing={{ xs: 1 }}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <LocalPhone sx={{ fontSize: "1.2rem" }} />
                  <Typography
                    variant="p"
                    style={{ margin: "10px 0", fontSize: ".85rem" }}
                  >
                    {MobileNumber || ""}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          )}
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
          title={"Terminate Employee"}
          id={EmployeeId}
          open={openDeactivateModal}
          handleCloseModal={handleCloseDeactivateModal}
        />
      )}
    </>
  );
};

export default EmployeeCard;
