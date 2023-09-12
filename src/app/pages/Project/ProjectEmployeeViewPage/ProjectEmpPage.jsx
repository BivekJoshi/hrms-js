import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";
import ProjectHomePage from "./ProjectHomePage";
import ProjectTeamPage from "./component/ProjectTeamPage";
import Project from "../ProjectAdminViewPage/Project";
import ProjectMyTask from "../ProjectTask/ProjectMyTask";
import { useGetProjectTaskByProjectId } from "../../../hooks/project/ProjectTask/useProjectTask";

export default function ProjectEmpPage() {
  const [value, setValue] = React.useState("1");
  const { data: employeeTask } = useGetProjectTaskByProjectId(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ border: 2, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Home" value="1" />
            <Tab label="All Projects" value="2" />
            <Tab label="Team" value="3" />
            <Tab label="My Task" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProjectHomePage data={employeeTask} />
        </TabPanel>
        <TabPanel value="2">
          <Project />
        </TabPanel>
        <TabPanel value="3">
          <ProjectTeamPage data={employeeTask} />
        </TabPanel>
        <TabPanel value="4">
          <ProjectMyTask data={employeeTask} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
