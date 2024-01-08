import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Male from "../../../assets/male.png";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import BarChatDiagram from "../../components/Charts/BarChatDiagram";
import DashboardCard from "../../components/cards/Dashboard/DashboardCard";
import { ProjectProgressCard } from "../../components/cards/ProjectProgress/ProjectProgressCard";
import { useGetLoggedInUser } from "../../hooks/auth/usePassword";
import { DOC_URL } from "../../../auth/axiosInterceptor";
import { EmployPichart } from "../EmployeePage/Component/EmployPichart";
import { useGetDashboard } from "../../hooks/dashboard/useDashboard";

const Dashboard = () => {
  const { mode } = useContext(ThemeModeContext);
  const { data, isLoading } = useGetDashboard();
  const { data: loggedUserData } = useGetLoggedInUser();
  const url = DOC_URL;

  const today = new Date();
  const day = new Date().toLocaleDateString("en-us", { weekday: "long" });

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);
  return (
    !isLoading && (
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
            src={
              loggedUserData?.userPhotoPath
                ? `${url}${loggedUserData.userPhotoPath}`
                : Male
            }
            alt="Img"
            sx={{ width: 66, height: 66, borderRadius: "2rem" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "0 1rem",
            }}
          >
            <div>
              <Typography variant="h6" fontWeight={600}>
                Welcome
              </Typography>

              <Typography variant="h6">{loggedUserData?.name}</Typography>
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
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(232px, 1fr))",
              }}
              gap={{ sm: "12px", lg: "32px" }}
            >
              <DashboardCard data={data} />
            </Grid>
          </div>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                Employee Information
              </Typography>
              <BarChatDiagram data={data?.employeeInfo} />
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
                  <ProjectProgressCard projectDataCount={data} />
                </Grid>
              </div>
            </Grid>
            {data?.employeeCountPerDepartment && (
              <Grid item md={6} xs={12}>
                <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                  Employee Department
                </Typography>
                <Grid
                  borderRadius={"6px"}
                  bgcolor={mode === "light" ? "white" : "#3f413f"}
                  padding="1rem "
                  boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
                >
                  <EmployPichart data={data?.employeeCountPerDepartment} />
                </Grid>
              </Grid>
            )}
            {data?.employeeCountPerEmpType && (
              <Grid item md={6} xs={12}>
                <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                  Employee Type
                </Typography>
                <Grid
                  borderRadius={"6px"}
                  bgcolor={mode === "light" ? "white" : "#3f413f"}
                  padding="1rem "
                  boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
                >
                  <EmployPichart data={data?.employeeCountPerEmpType} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </>
    )
  );
};

export default Dashboard;
