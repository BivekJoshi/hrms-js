import React, { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button, Card, Collapse, Switch } from '@mui/material';
import { ThemeModeContext } from '../../../theme/ThemeModeContext';
import { removeUser } from '../../utils/cookieHelper';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import CakeIcon from '@mui/icons-material/Cake';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
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

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function SideBar() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { toggleMode, themeMode } = useContext(ThemeModeContext); // Accessing themeMode from context
	console.log(useContext(ThemeModeContext));
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

	const primaryColor = '#1c7ed6';

	const drawerMenus = [
		{
			name: 'Dashboard',
			icon: <DashboardIcon style={{ color: primaryColor }} fontSize='large' />,
			path: 'dashboard',
			subMenus: [],
		},
		{
			name: 'Employee',
			icon: <PeopleAltIcon style={{ color: primaryColor }} fontSize='large' />,
			path: 'employee',
			subMenus: [
				{
					name: 'Add Employee',
					path: 'employee/add',
					icon: <PersonAddIcon style={{ color: primaryColor }} />,
				},
				{
					name: 'Employee',
					path: 'employee/add',
					icon: <PersonIcon style={{ color: primaryColor }} />,
				},
				{
					name: 'Leave',
					path: 'leave',
					icon: <MailIcon style={{ color: primaryColor }} />,
				},
				{
					name: 'Leave Type',
					path: 'leavetype',
					icon: <MailIcon style={{ color: primaryColor }} />,
				},
				{
					name: 'Attendance',
					path: 'employee/add',
					icon: <HowToRegIcon style={{ color: primaryColor }} />,
				},
				{
					name: 'Birthday',
					path: 'employee/add',
					icon: <CakeIcon style={{ color: primaryColor }} />,
				},
			],
		},
		{
			name: 'Department',
			icon: <WorkspacesIcon style={{ color: primaryColor }} fontSize='large' />,
			path: 'department',
			subMenus: [],
		},
		{
			name: 'Designation',
			icon: (
				<AssignmentIndIcon style={{ color: primaryColor }} fontSize='large' />
			),
			path: 'designation',
			subMenus: [],
		},
		{
			name: 'Company',
			icon: <BusinessIcon style={{ color: primaryColor }} fontSize='large' />,
			path: 'company',
			subMenus: [],
		},
		{
			name: 'ToDo List',
			icon: (
				<PlaylistAddCheckIcon
					style={{ color: primaryColor }}
					fontSize='large'
				/>
			),
			path: 'todolist',
			subMenus: [],
		},
	];

	const [subMenuOpen, setSubMenuOpen] = useState({});

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Human Resource Management System
					</Typography>
				</Toolbar>
			</AppBar>
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
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{drawerMenus.map((menu, index) => (
						<React.Fragment key={index}>
							<StyledNavLink key={index} to={menu.path}>
								<ListItemButton onClick={() => handleSubMenuToggle(index)}>
									<ListItemIcon>{menu.icon}</ListItemIcon>
									<ListItemText primary={menu.name} />
									{menu.subMenus.length > 0 ? (
										subMenuOpen[index] ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)
									) : null}
								</ListItemButton>
							</StyledNavLink>
							{menu.subMenus.length > 0 && (
								<Collapse in={subMenuOpen[index]} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{menu.subMenus.map((subMenu, subIndex) => (
											<StyledNavLink key={subIndex} to={subMenu.path}>
												<ListItemButton sx={{ pl: 4 }}>
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
						sx={{ backgroundColor: '#1c7ed6' }}
						onClick={() => {
							removeUser(navigate);
						}}
					>
						Logout
					</Button>
					<Typography variant='body2' sx={{ marginRight: '8px' }}>
						{themeMode === 'light' ? 'Light' : 'Dark'} Mode
					</Typography>
					<Switch
						checked={themeMode === 'dark'}
						onChange={toggleMode}
						style={{ color: primaryColor }}
					/>
				</Box>
			</Drawer>

			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}
