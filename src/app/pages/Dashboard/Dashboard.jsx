import React, { useRef, useEffect } from "react";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
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
import { Bar, Pie } from "react-chartjs-2";
import { ArcElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
import {
  useGetDashboard,
  useGetProjectCount,
} from "../../hooks/dashboard/useDashboard";
import { useGetProject } from "../../hooks/project/useProject";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 18,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
}));



const Dashboard = () => {
  const { data: dashboardData, isLoading: loadingDashboard } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();
 
  const barChartOptions = {
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

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Dashboard Pie Chart",
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



  const barChartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dashboardData,
        backgroundColor: ["yellowgreen", "red", "green", "blue", "pink"],
      },
    ],
  };

  const data = {
    labels,
    datasets: [
      {
        labels: "Data Pie Chart",
        data: [`${dashboardData?.allEmployees}`, `${dashboardData?.newEmployees}`, `${dashboardData?.maleEmployees}`,  `${dashboardData?.femaleEmployees}`, `${dashboardData?.allProjects}` ],
        backgroundColor: ["yellowgreen", "red", "green", "blue", "pink"],
        borderColor: ["yellowgreen", "red", "green", "blue", "pink"],
        borderWidth: 3,
      }
    ]
  }
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

      <Stack sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <Card sx={{ width: "600px" }}>
          <Bar options={barChartOptions} data={barChartData} />
        </Card>
        <Card sx={{ width: "400px" }}>
          <Pie options={pieChartOptions} data={data} />
        </Card>
      </Stack>

      <hr />
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))"}}>
      <Card sx={{maxWidth: "500px"}}>
        <CardHeader sx={{ color: "#2c2945" }} title="Project statistics" />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&>p": { borderRight: "1px solid #c6c3c3", padding: "1.2rem" },
          }}
        >
          <Typography> Total Project: {projectDataCount?.total}</Typography>
          <Typography>Completed: {projectDataCount?.completed}</Typography>
          <Typography>Pending: {projectDataCount?.pending}</Typography>
          <Typography>
            Work In Progress: {projectDataCount?.workInProgress}
          </Typography>
        </CardContent>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", color: "#2c2945" }}>
            <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Total Project</Typography>
              <Typography variant="h6">
                {Math.ceil((projectDataCount?.total / projectDataCount?.total) * 100)}%
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant="determinate"
              value={(projectDataCount?.total / projectDataCount?.total) * 100}
            />

            <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Completed Project</Typography>
              <Typography variant="h6">
                {Math.ceil((projectDataCount?.completed / projectDataCount?.total) * 100)}%
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant="determinate"
              value={(projectDataCount?.completed / projectDataCount?.total) * 100}
            />

            <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Pending Project</Typography>
              <Typography variant="h6">
                {Math.ceil((projectDataCount?.pending / projectDataCount?.total) * 100)}%
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant="determinate"
              value={(projectDataCount?.pending / projectDataCount?.total) * 100}
            />

            <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Work In Progress</Typography>
              <Typography variant="h6">
                {Math.ceil((projectDataCount?.workInProgress / projectDataCount?.total) * 100)}%
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant="determinate"
              value={(projectDataCount?.workInProgress / projectDataCount?.total) * 100}
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{maxWidth: "500px", height: "350px", overflowY: "scroll"}}>
        <CardHeader sx={{ color: "#2c2945", fontSize: "1.4rem" }} title="Projects" />
        <CardContent>
          <ListItem sx={{display: "flex", flexDirection: "column", alignItems: "baseline" }}>
            { projectData &&
              projectData.map((item,index)=> (
                <List key={index} sx={{cursor: "pointer", "&:hover": {
                  boxShadow: "0 0 4em 0px rgba(0, 0, 0, 0.4)"}, listStyle: "inherit", display: "flex", alignItems: "center", gap: "1rem", color: "#2c2945", fontSize: "1.4rem" }}><p>{index + 1}</p>{item?.projectName}</List>
              ))
            }
          </ListItem>
        </CardContent>
      </Card>
      </div>
    </>
  );
};

export default Dashboard;
