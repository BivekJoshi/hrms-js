import { Box, Tab } from '@mui/material';
import React from 'react';
import EmailConfiguration from './Component/EmailConfiguration';
import ChangeEmail from './Component/ChangeEmail';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PathConfiguration from './Component/PathConfiguration';
import PermissionHoc from '../../hoc/permissionHoc';

const Setting = ({ permissions }) => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label='lab API tabs example'>
          <Tab label='Email Configuration' value='1' />
          <Tab label='Change Email' value='2' />
          <Tab label='Path Configuration' value='3' />
        </TabList>
      </Box>

      <TabPanel value='1'>
        <EmailConfiguration permissions={permissions} />
      </TabPanel>
      <TabPanel value='2'>
        <ChangeEmail permissions={permissions} />
      </TabPanel>
      <TabPanel value='3'>
        <PathConfiguration permissions={permissions} />
      </TabPanel>
    </TabContext>
  );
};

export default PermissionHoc(Setting);
