import React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import BasicInfo from './BaiscInfoTab/BasicInfo';
import LeaveInfo from './LeaveInfoTab/LeaveInfo';
import AcademicsInfo from './AcademicsInfoTab/AcademicsInfo';


const primaryColor = '#1c7ed6';

const TabComponent = ({ data }) => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '74%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab
                            label='Basic Info'
                            value='1'
                            style={{
                                fontSize: '20px',
                                color: primaryColor,
                                fontWeight: 'bolder',
                            }}
                        />
                        <Tab
                            label='Leave Records'
                            value='2'
                            style={{
                                fontSize: '20px',
                                color: primaryColor,
                                fontWeight: 'bolder',
                            }}
                        />
                        <Tab
                            label='Academics'
                            value='3'
                            style={{
                                fontSize: '20px',
                                color: primaryColor,
                                fontWeight: 'bolder',
                            }}
                        />
                        <Tab
                            label='Experiences'
                            value='4'
                            style={{
                                fontSize: '20px',
                                color: primaryColor,
                                fontWeight: 'bolder',
                            }}
                        />
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <BasicInfo data={data} />
                </TabPanel>
                <TabPanel value='2'>
                    <LeaveInfo />
                </TabPanel>
                <TabPanel value='3'>
                    <AcademicsInfo />
                </TabPanel>
                <TabPanel value='4'>
                    <AcademicsInfo />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default TabComponent;
