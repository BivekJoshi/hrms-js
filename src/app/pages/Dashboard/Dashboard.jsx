import React from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { Box, Grid, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AiFillHome } from "react-icons/ai";
import EmployeeCount from "./DashboardTable/EmployeeCount";

import { useGetDashboard } from "../../hooks/dashboard/useDashboard";
import { useGetProjectCount } from "../../hooks/dashboard/useDashboard";
import { useGetProject } from "../../hooks/project/useProject";
import { PieChartDiagram } from "../../components/Charts/PieChartDiagram";
import { BarChatDiagram } from "../../components/Charts/BarChatDiagram";
import { ProjectProgressCard } from "../../components/cards/ProjectProgress/ProjectProgressCard";
import { ProjectTable } from "./DashboardTable/ProjectTable";

const Dashboard = () => {
  const { data: dashboardData } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "1fr", rowGap: "3rem" }}>
      <Stack flexDirection="row" gap="1rem" alignItems="center">
        <h3>DASHBORD</h3> <AiFillHome />
      </Stack>
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        justifyContent="space-between"
      >
        <DashboardCard title="Users" icon={<PersonIcon fontSize="large" />} />
        <DashboardCard
          title="Employees"
          icon={<PeopleAltIcon fontSize="large" />}
        />
        <DashboardCard
          title="Events"
          icon={<CalendarMonthIcon fontSize="large" />}
        />
        <DashboardCard
          title="Holiday"
          icon={<CalendarMonthIcon fontSize="large" />}
        />
        <DashboardCard
          title="Project"
          icon={<CalendarMonthIcon fontSize="large" />}
        />
      </Grid>
      <EmployeeCount />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        <BarChatDiagram data={dashboardData} />
        <PieChartDiagram data={dashboardData} />
      </Box>

      <Box
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          rowGap:"3rem"
        }}
      ><Box>
        <h3>Project Information</h3>
        <ProjectProgressCard projectDataCount={projectDataCount} />
      </Box>

        <Box >
          <h3>Our Projects</h3>
          {/* <Box sx={{ height: "350px", overflowY: "scroll" }}> */}
          <ProjectTable projectData={projectData}/>
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
