import React from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { Box, Grid, Stack } from "@mui/material";
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

const Dashboard = () => {
  const { data: dashboardData } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "1fr", rowGap: "3rem" }}>
      <Grid
        style={{ marginTop: "10px" }}
        container
        rowSpacing={4.5}
        justifyContent="space-around"
      >
        <DashboardCard
          title="Users"
          icon={<FaUsers fontSize="3rem" />}
          value={42}
        />
        <DashboardCard
          title="Employees"
          icon={<FaPeopleGroup fontSize="3rem" />}
          value={28}
        />
        <DashboardCard
          title="Events"
          icon={<BiSolidCalendarEvent fontSize="3rem" />}
          value={24}
        />
        <DashboardCard
          title="Holiday"
          icon={<FaGifts fontSize="3rem" />}
          value={32}
        />
        <DashboardCard
          title="Project"
          icon={<AiFillProject fontSize="3rem" />}
          value={6}
        />
      </Grid>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          justifySelf: { xs: "center", lg: "auto" },
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
          <h3>Project Information</h3>
          <ProjectProgressCard projectDataCount={projectDataCount} />
        </Box>

        <Box>
          <ProjectTable projectData={projectData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
