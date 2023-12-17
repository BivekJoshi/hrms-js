import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Employee from "../../../assets/employee.png";
import Event from "../../../assets/event.png";
import Holiday from "../../../assets/holiday.png";
import Male from "../../../assets/male.png";
import Project from "../../../assets/project.png";
import User from "../../../assets/user.png";
import { DOC_URL } from "../../../auth/axiosInterceptor";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import BarChatDiagram from "../../components/Charts/BarChatDiagram";
import { PieChartDiagram } from "../../components/Charts/PieChartDiagram";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { ProjectProgressCard } from "../../components/cards/ProjectProgress/ProjectProgressCard";
import { useGetLoggedInUser } from "../../hooks/auth/usePassword";
import { useGetUserRole } from "../../hooks/auth/userControl/useUserControl";
import {
  useGetDashboard,
  useGetProjectCount,
} from "../../hooks/dashboard/useDashboard";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useGetEvent } from "../../hooks/event/useEvent";
import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import { useGetPendingLeave } from "../../hooks/leave/useLeave";
import { useGetProject } from "../../hooks/project/useProject";
import { ProjectTable } from "./DashboardTable/ProjectTable";
import { useDashBoardSearch } from "./api/dashboardApi";

const Dashboard = () => {
  const { mode } = useContext(ThemeModeContext);

  const { data: dashboardData } = useGetDashboard();
  const { data: projectDataCount } = useGetProjectCount();
  const { data: projectData } = useGetProject();
  useGetPendingLeave();
  const { data: employeeData } = useGetEmployee();
  const { data: userRoleData } = useGetUserRole();
  const { data: myData } = useGetLoggedInUser();

  const { data, isLoading } = useDashBoardSearch(
    () => {
      console.log("Success");
    },
    () => {
      console.log("Error");
    }
  );

  const photo = employeeData?.userPhotoPath;
  const filePath = photo ? DOC_URL + photo : "";

  const today = new Date();
  const day = new Date().toLocaleDateString("en-us", { weekday: "long" });

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);


  console.log(data,"data fo das")
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
        boxShadow={7}
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
            marginRight: "1rem",
          }}
        >
          <div>
            <Typography variant="h6" fontWeight={600}>
              Welcome
            </Typography>

            <Typography variant="h6">{myData?.name}</Typography>
          </div>
          <div>
            <Typography variant="h6" textAlign="end" fontWeight={600}>
              {day}
            </Typography>
            <Typography variant="h6" textAlign="end">
              {formattedDate}
            </Typography>
          </div>
        </div>
      </Box>

      <Box sx={{ display: "grid", gridTemplateRows: "1fr", rowGap: "2rem" }}>
        <div>
          <Typography variant="h5" margin={"26px 0 16px"}>
            Summary
          </Typography>
          <Grid
            style={{
              // marginTop: "10px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(232px, 1fr))",
            }}
            // rowSpacing={1}
            gap={{ sm: "12px", lg: "32px" }}
          >
            <DashboardCard
              title="Users"
              icon={User}
              count={data?.totalUser}
              linkTo="/admin/users"
              borderColor="#3399FF"
            />
            <DashboardCard
              title="Employees"
              icon={Employee}
              count={data?.totalEmployee}
              linkTo="/admin/employee"
              borderColor="#F8B114"
            />
            <DashboardCard
              title="Events"
              icon={Event}
              count={data?.events}
              linkTo="/admin/event"
              borderColor="#108A23"
            />
            <DashboardCard
              title="Holiday"
              icon={Holiday}
              count={data?.holiday}
              linkTo="/admin/holiday"
              borderColor="#FF8A7B"
            />
            <DashboardCard
              title="Project"
              icon={Project}
              count={data?.project}
              linkTo="/admin/project"
              borderColor="#875923 "
            />
          </Grid>
        </div>

        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="h5" sx={{ marginBottom: "16px" }}>
              Employee Information
            </Typography>
            <BarChatDiagram dashboardData={dashboardData} />
            <PieChartDiagram dashboardData={dashboardData} />
          </Grid>
          <Grid item md={6} xs={12}>
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
