import { Box } from "@mui/system";
import React, { useContext } from "react";
import Male from "../../../../assets/male.png";
import "../../Style/Style.css";
import { LeftEmployDashbord } from "./LeftEmployDashbord";
import { RightEmployDashbord } from "./RightEmployDashbord";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const EmployeeDashbord = (props) => {
  const { mode } = useContext(ThemeModeContext);
  return (
    <Box display="grid" gridTemplateRows="1fr" gap="1rem">
      <Box
        display="flex"
        flexDirection="row"
       
        className={
          mode === "light" ? "employeeDeshbordBG" : "employeeDeshbordBGDark"
        }
      >
        <img src={Male} alt="profile" />
        <Box alignSelf="center">
          <h3>Welcome , Vivek</h3>
          <h3> Thursday, May 1, 2023</h3>
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