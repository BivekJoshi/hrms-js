import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Tab, Typography } from "@mui/material";
import * as React from "react";
import ProjectDetail from "../ProjectAdminViewPage/ProjectDetail";
import ProjectTask from "../ProjectTask/ProjectTask";
import { useParams } from "react-router-dom";
import { useGetProjectById } from "../../../hooks/project/useProject";
import PermissionHoc from "../../../hoc/permissionHoc";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const ProjectAddViewEmployeePage = ({ permissions }) => {
  const { mode, palette } = React.useContext(ThemeModeContext);
  const [value, setValue] = React.useState("1");
  const { id } = useParams();
  const { data: ProjectDetails } = useGetProjectById(id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: ".5rem",
    textTransform: "none",
    borderRadius: ".5rem",
    color: mode === "light" ? "black" : "white",
    textDecoder: "none",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === "dark" ? palette.text.primary : palette.secondary.light,
    borderBottom: "none",
    textDecoder: "none",
    color: mode === "dark" ? "black" : "white",
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Project: {ProjectDetails?.projectName}
      </Typography>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} indicatorColor='none'>
            <Tab
              label="Employee"
              value="1"
              style={value === "1" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="All Task"
              value="2"
              style={value === "2" ? activeLabelStyle : labelStyle}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProjectDetail />
        </TabPanel>
        <TabPanel value="2">
          <ProjectTask permissions={permissions} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PermissionHoc(ProjectAddViewEmployeePage);
