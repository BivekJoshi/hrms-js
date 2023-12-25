import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Divider, Tab, Typography } from '@mui/material';
import * as React from 'react';
import ProjectDetail from '../ProjectAdminViewPage/ProjectDetail';
import ProjectTask from '../ProjectTask/ProjectTask';
import { useParams } from 'react-router-dom';
import { useGetProjectById } from '../../../hooks/project/useProject';
import PermissionHoc from '../../../hoc/permissionHoc';

const ProjectAddViewEmployeePage = ({ permissions }) => {
  const [value, setValue] = React.useState('1');
  const { id } = useParams();
  const { data: ProjectDetails } = useGetProjectById(id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Project :{ProjectDetails?.projectName}
      </Typography>
      <Divider />
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label='Employee' value='1' />
            <Tab label='All Task' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <ProjectDetail />
        </TabPanel>
        <TabPanel value='2'>
          <ProjectTask permissions={permissions} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default PermissionHoc(ProjectAddViewEmployeePage);
