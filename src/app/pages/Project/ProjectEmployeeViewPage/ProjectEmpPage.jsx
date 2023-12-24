import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import * as React from 'react';
import ProjectHomePage from './ProjectHomePage';
import ProjectTeamPage from './component/ProjectTeamPage';
import Project from '../ProjectAdminViewPage/Project';
import ProjectMyTask from '../ProjectTask/ProjectMyTask';
import { useGetLoggedInUser } from '../../../hooks/auth/usePassword';
import { useGetProject } from '../../../hooks/project/useProject';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { useGetTaskLoggedInUser } from '../../../hooks/project/ProjectTask/useProjectTask';

export default function ProjectEmpPage() {
  // const { data: taskData } = useGetTaskLoggedInUser();
  // const { data: projectWiseEmployeeData } = useGetProjectWiseEmployee(
  //   logInUserData?.employeeId
  // );
  const { data: projectData, isLoading } = useGetProject();

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return projectData ? (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ border: 2, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {/* <Tab label="Home" value="1" /> */}
            <Tab label='All Projects' value='1' />
            <Tab label='Team' value='2' />
            <Tab label='My Task' value='3' />
          </TabList>
        </Box>
        {/* <TabPanel value="1">
          {/* <ProjectHomePage
            projectWiseEmployeeData={projectWiseEmployeeData}
            employeeData={employeeData}
            projectData={projectData}
          /> */}
        {/* </TabPanel>  */}
        <TabPanel value='1'>
          <Project projectData={projectData} isLoading={isLoading} />
        </TabPanel>
        <TabPanel value='2'>
          {/* <ProjectTeamPage
            projectWiseEmployeeData={projectWiseEmployeeData}
            employeeData={employeeData}
            projectData={projectData}
          /> */}
        </TabPanel>
        <TabPanel value='3'>
          {/* <ProjectMyTask taskData={taskData} /> */}
        </TabPanel>
      </TabContext>
    </Box>
  ) : (
    'hellow'
  );
}
