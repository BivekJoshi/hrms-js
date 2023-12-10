import React, { useContext } from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { Box, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { useGetDashboard } from "../../hooks/dashboard/useDashboard";
import { useGetProjectCount } from "../../hooks/dashboard/useDashboard";
import { useGetProject } from "../../hooks/project/useProject";
import { PieChartDiagram } from "../../components/Charts/PieChartDiagram";
import BarChatDiagram from "../../components/Charts/BarChatDiagram";
import { ProjectProgressCard } from "../../components/cards/ProjectProgress/ProjectProgressCard";
import { ProjectTable } from "./DashboardTable/ProjectTable";
import { FaPeopleGroup, FaGifts, FaUsers } from "react-icons/fa6";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { AiFillProject } from "react-icons/ai";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useGetEvent } from "../../hooks/event/useEvent";
import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import { useGetUserRole } from "../../hooks/auth/userControl/useUserControl";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import Male from "../../../assets/male.png";
import { useGetLoggedInUser } from "../../hooks/auth/usePassword";
import { useGetPendingLeave } from "../../hooks/leave/useLeave";
import { DOC_URL } from "../../../auth/axiosInterceptor";

const Dashboard = () => {
  const { mode } = useContext(ThemeModeContext);
  const { data: dashboardData } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();
  useGetPendingLeave();
  const { data: employeeData } = useGetEmployee();
  const { data: eventData } = useGetEvent();
  const { data: holidayData } = useGetHoliday();
  const { data: userRoleData } = useGetUserRole();
  const { data: myData } = useGetLoggedInUser();

  const photo = employeeData?.userPhotoPath;
  const filePath = photo ? DOC_URL + photo : "";

  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        padding="1rem"
        borderRadius="6px"
        style={{ width: "100%" }}
        className={
          mode === "light" ? "employeeDeshbordBG" : "employeeDeshbordBGDark"
        }
      >
        <CardMedia
          component="img"
          src={filePath ? filePath : Male}
          alt="Img"
          sx={{ width: 66, height: 66, borderRadius: "2rem" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h3>
            Welcome, <br></br>
            {myData?.name}
          </h3>
          <h3 style={{ maxWidth: "200px" }}>{formattedDate}</h3>
        </div>
      </Box>
      <Typography variant="h5" marginTop={"16px"}>
        Summary
      </Typography>

      <Box sx={{ display: "grid", gridTemplateRows: "1fr", rowGap: "2rem" }}>
        <Grid
          style={{ marginTop: "10px", width: "100%" }}
          container
          // rowSpacing={1}
          gap={{ sm: "12px", lg: "32px" }}
        >
          <DashboardCard
            title="Users"
            icon={<FaUsers fontSize="3rem" />}
            count={userRoleData?.length ? userRoleData?.length : "0"}
            linkTo="/admin/users"
          />
          <DashboardCard
            title="Employees"
            icon={<FaPeopleGroup fontSize="3rem" />}
            count={employeeData?.length ? employeeData.length : "0"}
            linkTo="/admin/employee"
          />
          <DashboardCard
            title="Events"
            icon={<BiSolidCalendarEvent fontSize="3rem" />}
            count={eventData ? eventData?.length : "0"}
            linkTo="/admin/event"
          />
          <DashboardCard
            title="Holiday"
            icon={<FaGifts fontSize="3rem" />}
            count={holidayData ? holidayData?.length : "0"}
            linkTo="/admin/holiday"
          />
          <DashboardCard
            title="Project"
            icon={<AiFillProject fontSize="3rem" />}
            count={projectDataCount?.total ? projectDataCount?.total : "0"}
            linkTo="/admin/project"
          />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ marginBottom: "16px" }}>
              Employee Information
            </Typography>
            <BarChatDiagram dashboardData={dashboardData} />
            <PieChartDiagram data={dashboardData} />
          </Grid>
          <Grid item xs={6}>
            <div>
              <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                Project Information
              </Typography>
              <Grid
                borderRadius={"6px"}
                bgcolor={mode === "light" ? "white" : "#3f413f"}
                padding="1rem "
                boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
              >
                <Typography variant="v6">
                  Total Project : {projectDataCount?.total}
                </Typography>
                <div style={{ marginTop: "16px" }}>
                  <ProjectProgressCard projectDataCount={projectDataCount} />
                </div>
              </Grid>
            </div>

            <Grid sx={{ mt: "32px" }}>
              <ProjectTable projectData={projectData} />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <PendingLeaveTable
              pendingLeaveData={pendingLeaveData}
              loading={loadingPendingLeave}
            /> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
