import React from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";

import { useGetDashboard } from "../../hooks/dashboard/useDashboard";
import { useGetProjectCount } from "../../hooks/dashboard/useDashboard";
import { useGetProject } from "../../hooks/project/useProject";
import { PieChartDiagram } from "../../components/Charts/PieChartDiagram";
import { BarChatDiagram } from "../../components/Charts/BarChatDiagram";
import { ProjectProgressCard } from "../../components/cards/ProjectProgress/ProjectProgressCard";
import { ProjectTable } from "./DashboardTable/ProjectTable";
import { FaPeopleGroup, FaGifts, FaUsers } from "react-icons/fa6";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { AiFillProject } from "react-icons/ai";
import PendingLeaveTable from "./DashboardTable/PendingLeaveTable";
import { useGetPendingLeave } from "../../hooks/leave/useLeave";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useGetEvent } from "../../hooks/event/useEvent";
import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import { useGetUserRole } from "../../hooks/auth/userControl/useUserControl";

const Dashboard = () => {
  const { data: dashboardData } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();
  const { data: pendingLeaveData, isLoading: loadingPendingLeave } = useGetPendingLeave();
  const { data: employeeData } = useGetEmployee();
  const { data: eventData } = useGetEvent();
  const { data: holidayData } = useGetHoliday();
  const { data: userRoleData } = useGetUserRole();



  return (
    <Box sx={{ display: "grid", gridTemplateRows: "1fr", rowGap: "3rem" }}>
      <Grid
        style={{ marginTop: "10px" }}
        container
        rowSpacing={4.5}
        justifyContent="space-around"
        gap={{sm:"1rem", lg:"0"}}
      >
        <DashboardCard
          title="Users"
          icon={<FaUsers fontSize="3rem" />}
          value={42}
          count={userRoleData?.length ? userRoleData?.length : "0"}
        />
        <DashboardCard
          title="Employees"
          icon={<FaPeopleGroup fontSize="3rem" />}
          value={28}
          count={employeeData?.length ? employeeData.length : "0"}
        />
        <DashboardCard
          title="Events"
          icon={<BiSolidCalendarEvent fontSize="3rem" />}
          value={24}
          count={eventData ? eventData?.length : "0"}
        />
        <DashboardCard
          title="Holiday"
          icon={<FaGifts fontSize="3rem" />}
          value={32}
          count={holidayData ? holidayData?.length : "0"}
        />
        <DashboardCard
          title="Project"
          icon={<AiFillProject fontSize="3rem" />}
          value={6}
          count={projectDataCount?.total ? projectDataCount?.total : "0"}
        />
      </Grid>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          // justifySelf: { xs: "center", lg: "auto" },
        }}
      >
        <BarChatDiagram data={dashboardData} />
        <PieChartDiagram data={dashboardData} />
      </Box>

      <Box
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          rowGap: "3rem",
        }}
      >
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h3>Project Information</h3>
            <Typography
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <h3 style={{fontWeight:"800"}}>Total Project : {projectDataCount?.total}</h3>
            </Typography>
          </Box>
          <ProjectProgressCard projectDataCount={projectDataCount} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ProjectTable projectData={projectData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PendingLeaveTable
              pendingLeaveData={pendingLeaveData}
              loading={loadingPendingLeave}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
