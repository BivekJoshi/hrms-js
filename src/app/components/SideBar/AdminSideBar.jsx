import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItemButton,
  Button,
} from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText, Collapse, IconButton } from '@mui/material/';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Card, Fab, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ThemeModeContext } from '../../../theme/ThemeModeContext';
import AdminHeader from '../Header/AdminHeader';
import BreadCrumbs from '../../../routes/adminRoutes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MailIcon from '@mui/icons-material/Mail';
import CakeIcon from '@mui/icons-material/Cake';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddchartIcon from '@mui/icons-material/Addchart';
import EventIcon from '@mui/icons-material/Event';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import LaptopIcon from '@mui/icons-material/Laptop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { removeUser } from '../../utils/cookieHelper';
import Footer from '../footer/Footer';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth + 24}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '-24px',
    }),
  })
);

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  background-color: #e5e5e5;
  color: #000;
  &.active {
    && {
      background-color: #e5e5e5;
    }
  }
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { mode } = useContext(ThemeModeContext);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { pathname } = useLocation();

  const drawerMenus = [
    {
      name: 'Dashboard',
      icon: (
        <DashboardIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'dashboard',
      subMenus: [],
    },
    {
      name: 'Employee',
      icon: (
        <PeopleAltIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'employee',
      subMenus: [
        // {
        //   name: 'Add Employee',
        //   path: 'employee/add',
        //   icon: <PersonAddIcon style={{ color: primaryColor }} />,
        // },
        {
          name: 'Employee',
          path: 'employee',
          icon: (
            <PersonIcon
              sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
            />
          ),
        },
        {
          name: 'Leave',
          path: 'employee/leave',
          icon: (
            <MailIcon
              sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
            />
          ),
        },
        {
          name: 'Leave Type',
          path: 'employee/leavetype',
          icon: (
            <MailIcon
              sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
            />
          ),
        },
        {
          name: 'Attendance',
          path: 'employee/attendance',
          icon: (
            <HowToRegIcon
              sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
            />
          ),
        },
        {
          name: 'Birthday',
          path: 'employee/birthday',
          icon: (
            <CakeIcon
              sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
            />
          ),
        },
      ],
    },
    {
      name: 'Logistics',
      icon: (
        <LaptopIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'logistics',
      subMenus: [],
    },
    {
      name: 'Department',
      icon: (
        <WorkspacesIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'department',
      subMenus: [],
    },
    {
      name: 'Designation',
      icon: (
        <AssignmentIndIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'designation',
      subMenus: [],
    },
    {
      name: 'Company',
      icon: (
        <BusinessIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'company',
      subMenus: [],
    },
    {
      name: 'Project',
      icon: (
        <AddchartIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'project',
      subMenus: [],
    },
    {
      name: 'Event',
      icon: (
        <EventIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'event',
      subMenus: [],
    },
    {
      name: 'Holiday',
      icon: (
        <HolidayVillageIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'holiday',
      subMenus: [],
    },
    {
      name: 'Todo',
      icon: (
        <PlaylistAddCheckIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'todolist',
      subMenus: [],
    },
    {
      name: 'Users',
      icon: (
        <PersonAddIcon
          sx={mode === 'light' ? { color: '#6DAB23' } : { color: 'white' }}
        />
      ),
      path: 'users',
      subMenus: [],
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuToggle = (index) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <Typography
            style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: '#01579b',
              letterSpacing: '0.1rem',
            }}
            variant='h6'
          >
            DGHUB
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerMenus.map((menu, index) => (
            <React.Fragment key={index}>
              <StyledNavLink key={index} to={menu.path}>
                <ListItemButton
                  onClick={() => handleSubMenuToggle(index)}
                  sx={{
                    backgroundColor:
                      pathname.includes(menu.path) && '#ace8639e',
                  }}
                >
                  <ListItemIcon
                    sx={
                      mode === 'light'
                        ? { color: 'Light', minWidth: '40px' }
                        : { color: 'White' }
                    }
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.name}
                    sx={
                      mode === 'light' ? { color: 'black' } : { color: 'white' }
                    }
                  />
                  {menu.subMenus.length > 0 ? (
                    subMenuOpen[index] ? (
                      <ExpandLess
                        sx={
                          mode === 'light'
                            ? { color: 'black' }
                            : { color: 'white' }
                        }
                      />
                    ) : (
                      <ExpandMore
                        sx={
                          mode === 'light'
                            ? { color: 'black' }
                            : { color: 'white' }
                        }
                      />
                    )
                  ) : null}
                </ListItemButton>
              </StyledNavLink>
              {menu.subMenus.length > 0 && (
                <Collapse in={subMenuOpen[index]} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <StyledNavLink key={subIndex} to={subMenu.path}>
                        <ListItemButton
                          sx={{
                            backgroundColor:
                              pathname.includes(subMenu.path) && '#ace8639e',
                          }}
                        >
                          <ListItemIcon>{subMenu.icon}</ListItemIcon>
                          <ListItemText primary={subMenu.name} />
                        </ListItemButton>
                      </StyledNavLink>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            flexDirection: 'column',
          }}
        >
          <Button
            variant='contained'
            sx={{ backgroundColor: '#6DAB23' }}
            onClick={() => {
              removeUser();
              navigate('/');
            }}
          >
            Logout
          </Button>
          {/* <Typography
            variant='body2'
            sx={{ marginRight: '8px', marginTop: '1rem' }}
          >
            {mode === 'light' ? 'Dark' : 'Light'} Mode
            <Switch checked={mode === 'dark'} onChange={toggleMode} />
          </Typography> */}
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <br />

        <Card
          variant='elevation'
          sx={{
            maxWidth: '100%',
            marginLeft: '24px',
            padding: '20px',
            boxSizing: 'border-box',
            '@media (min-width: 600px)': {
              maxWidth: open ? 'calc(100% - drawerWidth)' : '100%',
            },
          }}
        >
          <Box
            display='flex'
            justifyContent='flex-start'
            paddingBottom='8px'
            gap='1rem'
            alignItems='center'
          >
           
            <BreadCrumbs />
          </Box>
          <div style={{ minHeight: '90vh' }}>
            <Outlet />
          </div>
        </Card>
        <Footer />
      </Main>
    </Box>
  );
}
