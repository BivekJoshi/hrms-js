import { Chip, Grid, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const Footer = () => {
  const { palette } = useContext(ThemeModeContext);

  return (
    <Grid
      display='flex'
      p='0px 48px'
      height='62px'
      gap='22px'
      marginLeft='230px'
      alignItems='center'
      justifyContent='space-between'
      bgcolor={palette.primary.main}
      position='relative'
    >
      <Typography variant='h7' color='white'>
        DG TRADE © DIGIHUB
      </Typography>
      <Chip
        label='Version : 1.0'
        variant='filled'
        sx={{ fontSize: '13px', color: 'white' }}
      />
    </Grid>
  );
};

export default Footer;
