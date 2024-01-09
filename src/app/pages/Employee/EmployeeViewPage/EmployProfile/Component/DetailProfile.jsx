import React, { useContext } from 'react';
import { Box, Divider, Tab, Table, Tabs } from '@mui/material';
import { TableContainer, TableHead } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import LeaveInfo from '../../InfoTabs/LeaveInfoTab/LeaveInfo';
import AcademicsInfo from '../../InfoTabs/AcademicsInfoTab/AcademicsInfo';
import '../Style/Style.css';
import AttendenceInfo from '../../InfoTabs/AttendenceInfoTab/AttendenceInfo';
import DocumentInfo from '../../InfoTabs/DocumentInfoTab/DocumentInfo';
import TrainingInfo from '../../InfoTabs/TrainingInfoTab/TrainingInfo';
import PromotionHistory from '../../InfoTabs/PromotionHistory/PromotionHistory';
import EmployeeHistory from '../../InfoTabs/EmployeeHistoryTab/EmployeeHistory';
import BranchInfo from '../../InfoTabs/BranchTab/BranchInfo';
import DepartmentInfo from '../../InfoTabs/DepartmentTab/DepartmentInfo';
import EmploymentDetails from '../../InfoTabs/EmploymentDetails/EmploymentDetails';
import ThemeModeContext from '../../../../../../theme/ThemeModeContext';

export const DetailProfile = ({ data, role, setShowPersonalProfile }) => {
  const [value, setValue] = React.useState('1');
  const { palette, mode } = React.useContext(ThemeModeContext);

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
    // fontWeight: "bold",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === 'dark' ? palette.text.primary : palette.secondary.light,
    borderBottom: 'none',
    textDecoder: 'none',
    color: mode === 'dark' ? 'black' : 'white',

    // fontWeight: "bold",
  };
  const tabsData = [
    {
      label: 'Leave Records',
      value: '1',
      component: <LeaveInfo data={data} role={role} />,
    },
    {
      label: 'Attendance',
      value: '3',
      component: <AttendenceInfo data={data} role={role} />,
    },
    {
      label: 'Branch',
      value: '7',
      component: <BranchInfo data={data} role={role} />,
    },

    {
      label: 'Department',
      value: '8',
      component: <DepartmentInfo data={data} role={role} />,
    },
    {
      label: 'Position',
      value: '4',
      component: <PromotionHistory data={data} role={role} />,
    },
    {
      label: 'Training',
      value: '6',
      component: <TrainingInfo data={data} role={role} />,
    },

    {
      label: 'Academics',
      value: '2',
      component: <AcademicsInfo data={data} role={role} />,
    },

    {
      label: 'Work',
      value: '5',
      component: <EmployeeHistory data={data} role={role} />,
    },

    // {
    //   label: 'Employment Details',
    //   value: '10',
    //   component: <EmploymentDetails data={data} role={role} />,
    // },

    {
      label: 'Documents',
      value: '9',
      component: <DocumentInfo data={data} role={role} />,
    },
  ];

  const handleClick = (clickedTab) => {
    if (clickedTab === 'showPersonalProfile') {
      setShowPersonalProfile(true);
    } else {
      setShowPersonalProfile(false);
    }
  };

  return (
    <Box sx={{ typography: 'body1' }}>
      <TabContext value={value}>
        <TabList
          value={value}
          variant='scrollable'
          onChange={handleChange}
          // aria-label="lab API tabs example"
          // className="tableAlignment"
          indicatorColor='none'
        >
          {tabsData.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              onClick={() => handleClick(tab.value)}
              // style={{
              //   fontSize: "1rem",
              //   color: primaryColor,
              //   fontWeight: "bolder",
              // }}
              style={value === tab?.value ? activeLabelStyle : labelStyle}
            />
          ))}
        </TabList>
        <br />
        <Divider />
        <Box>
          {tabsData.map((tab) => (
            <TabPanel key={tab.value} value={tab.value} style={{ padding: 10 }}>
              {tab.component}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};
