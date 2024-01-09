import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Roles from "./Roles/Roles";
import Users from "./Users/Users";
import PermissionHoc from '../../../hoc/permissionHoc';
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const UserController = ({ permissions }) => {
  const [value, setValue] = React.useState('1');
  const { mode, palette } = React.useContext(ThemeModeContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: '.5rem',
    textTransform: 'none',
    borderRadius: '.5rem',
    color: mode === 'light' ? 'black' : 'white',
    textDecoder: 'none',
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === 'dark' ? palette.text.primary : palette.secondary.light,
    borderBottom: 'none',
    textDecoder: 'none',
    color: mode === 'dark' ? 'black' : 'white',
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab label="Users" value="1" />
              <Tab label="Roles" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"> <Users permissions={permissions} /> </TabPanel>
          <TabPanel value="2"> <Roles /> </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default PermissionHoc(UserController);