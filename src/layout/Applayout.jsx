import { Box, Container } from '@mui/material';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeModeContext from '../theme/ThemeModeContext';
import Footer from '../app/components/footer/Footer';

const Applayout = () => {
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context

  return (
    <>
      <Box
        className='appBoxLayout'
        sx={
          mode === 'light'
            ? { backgroundColor: 'white' }
            : { backgroundColor: '#292929' }
        }
        marginBottom='16px'
      >
        <Container maxWidth='xxl'>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Applayout;
