import { Chip, Grid, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const Footer = () => {
  const { palette } = useContext(ThemeModeContext);

  return (
    <Grid
      display='flex'
      p='0px 48px'
      width='100%'
      height='44px'
      gap='22px'
      bottom='0px'
      //   marginLeft='230px'
      alignItems='center'
      justifyContent='space-between'
      bgcolor={palette.primary.main}
      zIndex='99999'
    >
      <Typography variant='h7' color='white'>
      Secured Securities Limited
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
