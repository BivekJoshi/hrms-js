import { Box, CardMedia } from "@mui/material";
import React, { useContext } from "react";
import Male from "../../../../assets/male.png";
import "../../Style/Style.css";
import { LeftEmployDashbord } from "./LeftEmployDashbord";
import { RightEmployDashbord } from "./RightEmployDashbord";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import { EmployTaskCard } from "../Component/EmployTaskCard";
import { EmployPichart } from "../Component/EmployPichart";
import { MiddleEmployDashbord } from "./MiddleEmployDashbord";
import { useGetTaskLoggedInUser } from "../../../hooks/project/ProjectTask/useProjectTask";
import { useGetProjectWiseEmployee } from "../../../hooks/project/useProject";
import { DOC_URL } from "../../../../auth/axiosInterceptor";

const EmployeeDashbord = (props) => {
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);
  const { data: loginUsertask } = useGetTaskLoggedInUser();
  const { data: projectWiseEmployeeData } = useGetProjectWiseEmployee(
    employData?.employeeId
  );
  console.log(employData);
  const taskPendingData = Array.isArray(loginUsertask)
    ? loginUsertask?.filter(
        (status) =>
          status.status === "WORK_IN_PROGRESS" || status.status === "PENDING"
      )
    : "";

  const taskCompleteData = Array.isArray(loginUsertask)
    ? loginUsertask?.filter((status) => status.status === "COMPLETED")
    : "";
  const photo = employData?.userPhotoPath;
  const filePath = photo ? DOC_URL + photo : "";

  const task = [
    {
      nameOfTask: "Total Project",
      numberOfTask: projectWiseEmployeeData
        ? projectWiseEmployeeData.length
        : 0,
    },
    {
      nameOfTask: "Total Task",
      numberOfTask: loginUsertask ? loginUsertask.length : 0,
    },
    {
      nameOfTask: "Task Pending",
      numberOfTask: taskPendingData ? taskPendingData.length : 0,
    },
    {
      nameOfTask: "Task Complete",
      numberOfTask: taskCompleteData ? taskCompleteData.length : 0,
    },
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
          component="img"
          src={filePath ? filePath : Male}
          alt="Paella dish"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
        <Box alignSelf="center" paddingLeft="1rem">
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
        {/* <EmployPichart /> */}
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
