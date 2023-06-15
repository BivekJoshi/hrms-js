import React from 'react';
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


const primaryColor = '#1c7ed6';

export const drawerMenus = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon style={{ color: primaryColor }} />,
    path: 'dashboard',
    subMenus: [],
  },
  {
    name: 'Employee',
    icon: <PeopleAltIcon style={{ color: primaryColor }} />,
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
        path: 'attendance',
        icon: <HowToRegIcon style={{ color: primaryColor }} />,
      },
      {
        name: 'Birthday',
        path: 'birthday',
        icon: <CakeIcon style={{ color: primaryColor }} />,
      },
    ],
  },
  {
    name: 'Department',
    icon: <WorkspacesIcon style={{ color: primaryColor }} />,
    path: 'department',
    subMenus: [],
  },
  {
    name: 'Designation',
    icon: (
      <AssignmentIndIcon style={{ color: primaryColor }} />
    ),
    path: 'designation',
    subMenus: [],
  },
  {
    name: 'Company',
    icon: <BusinessIcon style={{ color: primaryColor }} />,
    path: 'company',
    subMenus: [],
  },
  // {
  //   name: 'Employee Overview',
  //   icon: (
  //     <PlaylistAddCheckIcon
  //       style={{ color: primaryColor }}
  //       fontSize='large'
  //     />
  //   ),
  //   path: 'practice',
  //   subMenus: [],
  // }
  {
    name: 'ToDo',
    icon: <PlaylistAddCheckIcon style={{ color: primaryColor }} />,
    path: 'todolist',
    subMenus: [],
  },
];