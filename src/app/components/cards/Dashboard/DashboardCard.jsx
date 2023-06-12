import React from 'react'
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCard from '../MainCard';

const DashboardCard = ({ title, icon }) => {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary" align='center'>
          {icon}
        </Typography>
        <Typography variant="h4" color="inherit" align='center'>
          {title}
        </Typography>
      </Stack>
      {/* <Box sx={{ pt: 2.25 }}>
    
    </Box> */}
    </MainCard>
  )
}

export default DashboardCard