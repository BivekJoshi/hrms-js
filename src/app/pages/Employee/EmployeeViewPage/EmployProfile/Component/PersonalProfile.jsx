import React, { useContext, useState } from "react";
import { Box, Chip, Grid } from "@mui/material";
import { Typography, Avatar } from "@mui/material";
import Male from "../../../../../../assets/male.png";
import Female from "../../../../../../assets/female.png";
import BasicInfo from "./BasicInfo";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import { DOC_URL } from "../../../../../../auth/axiosInterceptor";
import EmailModal from "../../../../Email/EmailModal";

const primaryColor = "#1c7ed6";

export const PersonalProfile = ({ data, role }) => {
  const { mode } = useContext(ThemeModeContext);
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const handleOpenEmailform = () => {
    setOpenEmailForm(true);
  };
  const handleCloseEmailform = () => {
    setOpenEmailForm(false);
  };

  const filePath = data?.employeePhotoPath
    ? DOC_URL + data?.employeePhotoPath
    : data?.gender === "MALE"
    ? Male
    : Female;

  // const employeeName = data && data?.employeeHistory?.[0]?.employee;
  // const positionName = (data?.positionName);
  const positionName =
    data && data?.employeeHistory?.map((item) => item.position?.positionName);

  return (
    <>
      <Grid
        sx={{
          bgcolor: mode === "light" ? "#cfe8fc" : "#292929",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          borderRadius: 5,
          alignItems: "center",
          p: "1rem",
          gap: "1rem",
        }}
      >
        <Box
          className="profileInfo"
          bgcolor={mode === "light" ? "" : "#3f413f"}
          sx={{ background: mode === "light" ? "#bfddf5" : "#3f413f" }}
        >
          <Avatar
            sx={{
              width: 190,
              height: 190,
              bgcolor: primaryColor,
              alignSelf: "center",
            }}
            variant="circle"
            src={filePath}
          />
          <Typography
            sx={{
              color: primaryColor,
              fontSize: "1.3rem",
              fontWeight: "600",
            }}
          >
            {data?.firstName +
              " " +
              data?.middleName +
              " " +
              data?.lastName}
          </Typography>
          {/* <Chip
            label={positionName}
            sx={{ bgcolor: primaryColor, color: 'white', width: ' 9rem', display: 'flex', flexDirection: 'column' }}
          /> */}
          <Typography
            sx={{
              bgcolor: primaryColor,
              color: "white",
              width: "10rem",
              borderRadius: "2rem",
              padding: positionName && positionName.length > 1 ? "1rem 0rem" : "0",
              display: "flex",
              flexDirection: "column",
              // marginTop: positionName && positionName.length > 1 ? "1rem" : 0,
            }}
          >
            {positionName &&
              positionName.map((position, index) => (
                <span key={index}>{position}</span>
              ))}
          </Typography>

          <Typography
            onClick={handleOpenEmailform}
            sx={{
              color: primaryColor,
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {data?.officeEmail}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: "1rem", fontWeight: "600" }}
          >
            {data?.data?.addresses[0]?.city === null
              ? ""
              : data?.data?.addresses[0]?.city}
          </Typography>
          <Typography
            sx={{ color: primaryColor, fontSize: "1rem", fontWeight: "600" }}
          >
            {data?.mobileNumber}
          </Typography>
        </Box>

        <BasicInfo
          data={data}
          mode={mode}
          role={role}
          positionName={positionName}
        />
      </Grid>

      {openEmailForm && (
        <EmailModal
          title={"Send Email"}
          officeEmail={data?.officeEmail || ""}
          employeeId={data?.id}
          open={openEmailForm}
          onClose={handleCloseEmailform}
          handleOpenEmailform={handleOpenEmailform}
        />
      )}
    </>
  );
};
