import { Box, Container } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ThemeModeContext from '../theme/ThemeModeContext';
import { getUser, removeUser } from '../app/utils/cookieHelper';

const Applayout = () => {
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context
  const user = getUser();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/' && user) {
      removeUser();
    }
  }, [user]);

  return (
    <div style={{ position: 'relative' }}>
      <Box
        className='appBoxLayout'
        sx={
          mode === 'light'
            ? { backgroundColor: 'white' }
            : { backgroundColor: '#292929' }
        }
      >
        <Container maxWidth='xxl'>
          <Outlet />
        </Container>
      </Box>
    </div>
  );
};

export default Applayout;
