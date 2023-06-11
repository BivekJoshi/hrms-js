import React from 'react'
import MainCard from '../MainCard'
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';

const DashboardCard = ({title,count,color,extra}) => {
  return (
    <Card contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
    {/* <Box sx={{ pt: 2.25 }}>
    
    </Box> */}
  </Card>
  )
}

export default DashboardCard