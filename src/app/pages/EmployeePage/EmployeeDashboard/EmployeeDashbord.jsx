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
import { EmployTaskCard } from "../Component/EmployTaskCard";
import { EmployPichart } from "../Component/EmployPichart";
import { EmployLineChart } from "../Component/EmployLineChart";
import { MiddleEmployDashbord } from "./MiddleEmployDashbord";
import { getBaseUrl } from "../../../../auth/getBaseUrl";
import contextPath from "../../../../auth/contextPath";

const EmployeeDashbord = (props) => {
  const baseUrl = getBaseUrl();
  const path = contextPath();
  console.log(baseUrl, path)
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);
  // const img = DOC_URL + employData.userPhotoPath;
  const task = [
    { nameOfTask: "Total Project", numberOfTask: "4" },
    { nameOfTask: "Total Task", numberOfTask: "4" },
    { nameOfTask: "Task Pending", numberOfTask: "4" },
    { nameOfTask: "Task Complete", numberOfTask: "4" },
  ];
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
          src={Male}
          component="img"
          // src={
          //   employData?.userPhotoPath
          //     ? img :
          //     // EGender === "MALE" ?
          //      Male
          //     // : ""
          //     // ? Female
          //     // : Female
          // }
          alt="Paella dish"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
        <Box alignSelf="center">
          <h3>Welcome , {employData?.name}</h3>
          <h3>{formattedDate}</h3>
        </Box>
      </Box>
      <Box
        display="grid"
        grid
        gridTemplateColumns="repeat(auto-fit, minmax(125px, 1fr))"
        gap="1rem"
        padding="2rem 0 0"
      >
        {task.map((taskDetail, index) => (
          <EmployTaskCard
            nameOfTask={taskDetail.nameOfTask}
            numberOfTask={taskDetail.numberOfTask}
          />
        ))}
        <EmployPichart />
      </Box>
      <MiddleEmployDashbord />
      <Box display="grid" gridTemplateColumns="3fr 2fr" gap="3rem">
        <LeftEmployDashbord />
        <RightEmployDashbord />
      </Box>
    </Box>
  );
};

export default EmployeeDashbord;
