import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";
import ProjectHomePage from "./ProjectHomePage";
import { useGetProjectEmployeeTaskById } from "../../../hooks/project/projectEmployee/useProjectEmployee";
import ProjectTeamPage from "./ProjectTeamPage";
import ProjectMyTask from "../ProjectTask/ProjectMyTask";
import Project from "../ProjectAdminViewPage/Project";

export default function ProjectEmpPage() {
  const [value, setValue] = React.useState("2");
  const { data: employeeTask } = useGetProjectEmployeeTaskById(1);
  console.log(employeeTask);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ border: 2, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="All Projects" value="1" />
            <Tab label="Home" value="2" />
            <Tab label="Team" value="3" />
            <Tab label="My Task" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Project/>
        </TabPanel>
        <TabPanel value="2">
          <ProjectHomePage data={employeeTask} />
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
