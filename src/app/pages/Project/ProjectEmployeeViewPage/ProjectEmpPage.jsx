import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";
import ProjectHomePage from "./ProjectHomePage";

export default function ProjectEmpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ border: 2, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Home" value="1" />
            <Tab label="Team" value="2" />
            <Tab label="My Task" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProjectHomePage />
        </TabPanel>
        <TabPanel value="2">Team</TabPanel>
        <TabPanel value="3">My Task</TabPanel>
      </TabContext>
    </Box>
  );
}