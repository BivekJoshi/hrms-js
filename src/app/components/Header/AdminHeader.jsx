import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGetTodayBirthday } from '../../hooks/birthday/useBirthday';
import Notification from '../../pages/Notification/Notification';
import Profile from '../../pages/Auth/Profile/Profile';
import TodayBirthday from '../../pages/Birthday/TodayBirthday';
import { useGetEventNotification } from '../../hooks/event/useEvent';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 230px)`,
    marginLeft: '230px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AdminHeader({ open, handleDrawerOpen }) {
  const { data: birthdayData } = useGetTodayBirthday();
  const { data: eventData } = useGetEventNotification();
  const { mode, toggleMode, palette } = useContext(ThemeModeContext);

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box display='flex' flexDirection='row' alignItems='center'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
          <Typography variant='h6' noWrap color={'#fff'}>
            Human Resource Management System
          </Typography>
        </Box>

        <Stack flexDirection='row'>
          <IconButton onClick={toggleMode}>
            {palette.mode === 'dark' ? (
              <Tooltip title='Switch Light Mode'>
                <DarkModeOutlined sx={{ fontSize: '25px' }} />
              </Tooltip>
            ) : (
              <Tooltip title='Switch Dark Mode'>
                <LightModeOutlined
                  style={{ color: 'white' }}
                  sx={{ fontSize: '25px' }}
                />
              </Tooltip>
            )}
          </IconButton>

          <TodayBirthday data={birthdayData} />
          <Notification data={eventData} />
          <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
