import React, { useState, useEffect, useRef, useContext } from "react";
import { Email, LocalPhone } from "@mui/icons-material";
import { Box, Button, CardMedia, Tooltip } from "@mui/material";
import { Chip, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Male from "../../../../assets/male.png";
import Female from "../../../../assets/female.png";
import MainCard from "../MainCard";
import EmailModal from "../../../pages/Email/EmailModal";
import { EditDeactivationEmployeeModal } from "../../../pages/Employee/EmployeeDeactivationModal/EditDeactivationEmployeeModal";
import ProgressbyAll from "../../../pages/Employee/ProgressEmployeeData/ProgressbyAll";
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
  multiplePosition,
  EGender,
  ProgressBarRes,
  employeePhoto,
}) => {
  const { isEmployee } = useAuth();
  const [open, setOpen] = useState(false);
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const navigate = useNavigate();
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

  const imageFinal = employeePhoto
    ? DOC_URL + employeePhoto
    : EGender === "MALE"
    ? Male
    : Female;

  const newMultiplePosition =
    multiplePosition &&
    multiplePosition.map((item) => item?.position?.positionName);
  
  return (
    <>
      <Box sx={{ display: "grid", alignItems: "stretch" }}>
        <MainCard
          grow={true}
          style={{
            textAlign: "center",
            padding: "1rem 1.5rem",
            backgroundColor: mode === "light" ? "white" : "#292929",
          }}
        >
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <div style={{ paddingTop: "16px" }}>
              {ProgressBarRes && (
                <ProgressbyAll ProgressbyAll={ProgressBarRes} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "ceneter" }}>
              {isEmployee ? (
                ""
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      style={{
                        fontSize: ".7rem",
                        padding: "1px 5px",
                      }}
                      onClick={handleClick}
                      variant="outlined"
                      color={IsActive ? "success" : "warning"}
                    >
                      {IsActive ? "Terminate" : "Active"}
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        fontSize: ".7rem",
                        padding: "1px 12px",
                        margin: "0 0.4rem",
                      }}
                      onClick={() => {
                        navigate(`edit/${EmployeeId}`);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Box>

          <Stack
            sx={{
              textAlign: " -webkit-center",
              marginTop: "1rem",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`${EmployeeId}`);
            }}
          >
            <CardMedia
              component="img"
              src={imageFinal}
              alt="Img"
              sx={{ width: 66, height: 66, borderRadius: "2rem" }}
            />

            <Chip
              sx={{
                bgcolor: mode === "light" ? "white" : "rgb(41, 41, 41)",
                fontSize: "1rem",
                width: "100%",
              }}
              label={
                <Typography
                  variant="h6"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textTransform: "capitalize",
                  }}
                >
                  {EFirstName || ""} {EMiddleName || ""} {ELastName || ""}
                </Typography>
              }
            />
            {/* {PositionName && (
              <Box pt={"1rem 0 0 0"}>
                <Tooltip title={PositionLevel || ""}>
                  <Chip
                    style={{ width: 230 }}
                    label={
                      <Typography
                        variant="p"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >{`${PositionName || ""} `}</Typography>
                    }
                  />
                </Tooltip>
              </Box>
            )} */}
            {multiplePosition && multiplePosition.length > 0 && (
              <>
                <Box pt={"1rem 0 0 0"}>
                  <Tooltip title={newMultiplePosition.slice(1).join(", ")}>
                    <Chip
                      style={{ width: 230 }}
                      label={
                        <Typography
                          variant="body1"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {newMultiplePosition[0]}
                        </Typography>
                      }
                    />
                  </Tooltip>

                  {/* <Typography
                 sx={{
                   borderRadius: "2rem",
                   padding:
                     newMultiplePosition && newMultiplePosition.length > 1
                       ? "1rem 0rem"
                       : "0",
                   display: "flex",
                   flexDirection: "column",
                 }}
               >
                 {newMultiplePosition.map((position, index) => (
                   <span key={index}>{position}</span>
                 ))}
               </Typography> */}
                </Box>
              </>
            )}
          </Stack>

          {isEmployee ? (
            ""
          ) : (
            <Stack
              sx={{
                fontSize: ".9rem",
                pt: "1rem",
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
            title={"Send Email"}
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
