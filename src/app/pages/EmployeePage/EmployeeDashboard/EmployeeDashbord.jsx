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
import TaskIcon from "@mui/icons-material/Task";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PendingIcon from "@mui/icons-material/Pending";
import BallotIcon from "@mui/icons-material/Ballot";

const EmployeeDashbord = ({}) => {
  const { data: employData } = useGetLoggedInUser();
  const { mode } = useContext(ThemeModeContext);
  const { data: loginUsertask } = useGetTaskLoggedInUser();
  const { data: projectWiseEmployeeData } = useGetProjectWiseEmployee(
    employData?.employeeId
  );
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
      taskIcon: <AccountTreeIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      nameOfTask: "Total Task",
      numberOfTask: loginUsertask ? loginUsertask.length : 0,
      taskIcon: <BallotIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      nameOfTask: "Task Pending",
      numberOfTask: taskPendingData ? taskPendingData.length : 0,
      taskIcon: <PendingIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      nameOfTask: "Task Complete",
      numberOfTask: taskCompleteData ? taskCompleteData.length : 0,
      taskIcon: <TaskIcon sx={{ width: "2rem", height: "2rem" }} />,
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
        boxShadow="7"
        borderRadius="10px"
      >
        <CardMedia
          component="img"
          src={filePath ? filePath : Male}
          alt="Paella dish"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h3>
            Welcome , <br></br>
            {employData?.name}
          </h3>
          <h3  style={{ maxWidth: "200px" }}>{formattedDate}</h3>
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
            key={index}
            nameOfTask={taskDetail.nameOfTask}
            numberOfTask={taskDetail.numberOfTask}
            taskIcon={taskDetail.taskIcon}
          />
        ))}
        {/* <EmployPichart task={task}/> */}
      </Box>
      <MiddleEmployDashbord employData={employData} />
      <Box display="grid" gridTemplateColumns="3fr 2fr" gap="3rem">
        <LeftEmployDashbord />
        <RightEmployDashbord employData={employData} />
      </Box>
    </Box>
  );
};

export default EmployeeDashbord;
