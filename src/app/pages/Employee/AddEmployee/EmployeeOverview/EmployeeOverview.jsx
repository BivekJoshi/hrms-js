import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Chip, Divider, Grid, Paper, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { LocalPhone } from '@mui/icons-material';
import EmpViewTab from './tabcomponent/EmpViewTab';
import { useGetEmployeeById } from '../../../../hooks/employee/useEmployee';
import { useParams } from 'react-router-dom';


export default function EmployeeOverview() {
    const { id } = useParams();
    const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
    if (isLoading) return <>Loading</>;
    return (
        // <div>{employeeDataById?.firstName} {employeeDataById?.middleName} {employeeDataById?.lastName}</div>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Stack direction="row" spacing={2}>
                            <Grid container spacing={2}>
                                <Grid
                                    item xs={2}
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Avatar
                                        alt="PasswordSize Photo"
                                        src=""
                                        sx={{ width: 150, height: 150 }}
                                        variant="square"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h5" gutterBottom>
                                        {employeeDataById?.firstName} {employeeDataById?.middleName} {employeeDataById?.lastName}
                                    </Typography>
                                    <Chip label="Intern" style={{ width: 230 }} />
                                    <br /><br />
                                    <Stack spacing={3} direction="row">
                                        <EmailIcon />
                                        bvkjoshi67@gmail.com
                                    </Stack>
                                    <Stack spacing={3} direction="row">
                                        <LocalPhone />
                                        9876543212
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                        <br />
                        <Divider light />
                        <Paper elevation={0} >
                            <EmpViewTab />
                        </Paper>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}