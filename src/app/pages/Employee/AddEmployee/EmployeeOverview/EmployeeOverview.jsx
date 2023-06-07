import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Chip, Divider, Grid, Paper, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { LocalPhone } from '@mui/icons-material';
import EmpViewTab from './tabcomponent/EmpViewTab';


const card = (
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
                            Bivek Joshi
                        </Typography>
                        <Chip label="Intern" style={{ width: 230 }} />
                        <br/><br/>
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
);

export default function EmployeeOverview() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}