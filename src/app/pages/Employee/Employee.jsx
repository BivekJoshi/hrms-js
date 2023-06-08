import React from "react";
import { useGetEmployee } from "../../hooks/employee/useEmployee";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Email, LocalPhone } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Employee = () => {
  const { data: employeeData, isLoading } = useGetEmployee();
  if (isLoading) return <>Loading</>;
  return (
    // <div>{employeeData[0].firstName}</div>
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
      {employeeData.map((employee) => (
        <Paper
          key={employee.id}
          sx={{
            p: 2,
            // margin: 'auto',
            maxWidth: 450,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            cursor: 'pointer'
          }}
        >
          <Grid container spacing={2} key={employee.id}>
            <Grid item>
              <ButtonBase sx={{ width: 110, height: 150 }}>
                <Avatar
                  alt="Remy Sharp"
                  src=""
                  sx={{ width: 66, height: 66 }}
                />
              </ButtonBase>
              <Typography variant="body2" color="text.secondary">
                ID: {employee.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {employee.firstName} {employee.middleName} {employee.lastName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <Chip label="Intern" style={{ width: 230 }} />
                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    <Stack spacing={3} direction="row">
                      <Email />
                      bvkjoshi67@gmail.com
                    </Stack>

                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    <Stack spacing={3} direction="row">
                      <LocalPhone />
                      9878787878
                    </Stack>
                  </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="flex-end">
                  <Stack spacing={2} direction="row">
                    <Button variant="outlined">Edit</Button>
                    <NavLink to={`${employee.id}`}>
                      <Button variant="contained">View Profile</Button>
                    </NavLink>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Stack>


  );
};

export default Employee;
