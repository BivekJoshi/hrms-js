import React from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmployeeCount from "./DashboardTable/EmployeeCount";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetDashboard, useGetProjectStatus } from "../../hooks/dashboard/useDashboard";
import MainCard from "../../components/cards/MainCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: dashboardData, isLoading: loadingDashboard } =  useGetDashboard();
  const { data: projectStatusData } = useGetProjectStatus();

  console.log(projectStatusData)
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Bar Chart",
      },
    },
  };

  const labels = [
    "allEmployees",
    "newEmployees",
    "maleEmployees",
    "femaleEmployees",
    "allProjects",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dashboardData,
        backgroundColor: "yellowgreen",
      },
    ],
  };

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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
      <br />
      <EmployeeCount />
      <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
        <Card sx={{ width: "700px" }}>
          <Bar options={options} data={data} />
        </Card>
        <Card sx={{maxHeight: "380px", Width: "400px", overflowY: "scroll"}}>
          {dashboardData &&
            Object.keys(dashboardData).map((key) => {
              if (key.includes("projectNames")) {
                return (
                  <ListItem key={key}>
                    <Typography variant="body1">
                      <Typography variant="h5" sx={{textAlign: "center", color: "blue"}}>All Projects</Typography>
                      {dashboardData[key].map((projectName) => (
                        <List key={projectName}>
                          <ListItem sx={{fontSize: "1.6rem", color: "yellowgreen",  '&:hover': {boxShadow: "0 0 4em 0px rgba(0, 0, 0, 0.4)"}, transform: "scale(1.01)", cursor: "pointer"}}>{projectName}</ListItem>
                        </List>
                      ))}
                    </Typography>
                  </ListItem>
                );
              }
            })}
        </Card>
        {/* <MainCard>
        {Object.keys(projectStatusData).map(([key, value]) => (
        <div key={key} className="card">
          <span>{key}: </span>
          <span>{value}</span>
        </div>
      ))}
        </MainCard> */}
      </Typography>
    </>
  );
};

export default Dashboard;