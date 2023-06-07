import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, Grid, Typography } from '@mui/material';
import BasicInfoView from './BasicInfoView';
import LeaveEmpView from './LeaveEmpView';

export default function EmpViewTab() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
                            <TabList
                                orientation="vertical"
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Basic Info" value="1" />
                                <Tab label="Leave Records" value="2" />
                                <Tab label="Academics" value="3" />
                            </TabList>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <TabPanel value="1">
                            <Typography variant="h5" gutterBottom align="center">Basic Detail</Typography>
                            <Card variant="outlined">
                                <BasicInfoView />
                            </Card>
                        </TabPanel>
                        <TabPanel value="2">
                            <Typography variant="h5" gutterBottom align="center">Leave Records</Typography>
                            <Card variant="outlined">
                                <LeaveEmpView/>
                            </Card>
                        </TabPanel>
                        <TabPanel value="3">
                            <Typography variant="h5" gutterBottom align="center">Academemics</Typography>
                            <Card variant="outlined">card</Card>
                        </TabPanel>
                    </Grid>
                </Grid>
            </TabContext>

        </Box >
    );
}
