import { Box } from "@mui/system";
import React, { useContext } from "react";
import Male from "../../../../assets/male.png";
import Female from "../../../../assets/female.png";
import "../../Style/Style.css";
import { LeftEmployDashbord } from "./LeftEmployDashbord";
import { RightEmployDashbord } from "./RightEmployDashbord";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import { DOC_URL } from "../../../../auth/axiosInterceptor";
import { CardMedia } from "@mui/material";

const EmployeeDashbord = (props) => {
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);
  const img = DOC_URL + employData.userPhotoPath;

  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <Box display="grid" gridTemplateRows="1fr" gap="1rem">
      <Box
        display="flex"
        flexDirection="row"
        padding="1rem"
        className={
          mode === "light" ? "employeeDeshbordBG" : "employeeDeshbordBGDark"
        }
      >
        <CardMedia
          component="img"
          src={
            employData?.userPhotoPath
              ? img : 
              // EGender === "MALE" ?
               Male
              // : ""
              // ? Female
              // : Female
          }
          alt="Paella dish"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />{" "}
        <Box alignSelf="center">
          <h3>Welcome , {employData.name}</h3>
          <h3>{formattedDate}</h3>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="3fr 2fr" gap="3rem">
        <LeftEmployDashbord />
        <RightEmployDashbord />
      </Box>
    </Box>
  );
};

export default EmployeeDashbord;
