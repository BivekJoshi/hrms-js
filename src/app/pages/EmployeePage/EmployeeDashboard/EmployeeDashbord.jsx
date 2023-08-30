import { Box } from "@mui/system";
import React, { useContext } from "react";
import Male from "../../../../assets/male.png";
import "../../Style/Style.css";
import { LeftEmployDashbord } from "./LeftEmployDashbord";
import { RightEmployDashbord } from "./RightEmployDashbord";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";

const EmployeeDashbord = (props) => {
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);

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
        <img src={Male} alt="profile" />
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
