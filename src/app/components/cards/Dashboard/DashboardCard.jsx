import React from 'react'
import { Stack, Typography } from '@mui/material';
import MainCard from '../MainCard';

const DashboardCard = ({ title, icon }) => {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="primary.main" align='center'>
          {icon}
        </Typography>
        <Typography variant="h6" color="inherit" align='center'>
          {title}
        </Typography>
      </Stack>
    </MainCard>
  )
}

export default DashboardCard