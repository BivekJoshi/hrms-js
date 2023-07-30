import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
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

const primaryColor = "#01579b";

export const drawerMenus = [
  {
    name: "Dashboard",
    icon: (
      <DashboardIcon
        style={mode === "light " ? { color: "#01579b" } : { color: "white" }}
      />
    ),
    path: "dashboard",
    subMenus: [],
  },
  {
    name: "Employee",
    icon: <PeopleAltIcon style={{ color: primaryColor }} />,
    path: "employee",
    subMenus: [
      {
        name: "Employee",
        path: "employee",
        icon: <PersonIcon style={{ color: primaryColor }} />,
      },
      {
        name: "Leave",
        path: "leave",
        icon: <MailIcon style={{ color: primaryColor }} />,
      },
      {
        name: "Leave Type",
        path: "leavetype",
        icon: <MailIcon style={{ color: primaryColor }} />,
      },
      {
        name: "Attendance",
        path: "attendance",
        icon: <HowToRegIcon style={{ color: primaryColor }} />,
      },
      {
        name: "Birthday",
        path: "birthday",
        icon: <CakeIcon style={{ color: primaryColor }} />,
      },
    ],
  },
  {
    name: 'Office Reource',
    icon: <LaptopIcon style={{ color: primaryColor }} />,
    path: 'resource/employee',
    subMenus: [],
  },
  {
    name: 'Department',
    icon: <WorkspacesIcon style={{ color: primaryColor }} />,
    path: "department",
    subMenus: [],
  },
  {
    name: "Designation",
    icon: <AssignmentIndIcon style={{ color: primaryColor }} />,
    path: "designation",
    subMenus: [],
  },
  {
    name: "Company",
    icon: <BusinessIcon style={{ color: primaryColor }} />,
    path: "company",
    subMenus: [],
  },
  {
    name: "Project",
    icon: <AddchartIcon style={{ color: primaryColor }} />,
    path: "project",
    subMenus: [],
  },
  {
    name: "Event",
    icon: <EventIcon style={{ color: primaryColor }} />,
    path: "event",
    subMenus: [],
  },
  {
    name: "Holiday",
    icon: <HolidayVillageIcon style={{ color: primaryColor }} />,
    path: "holiday",
    subMenus: [],
  },
  {
    name: "ToDo",
    icon: <PlaylistAddCheckIcon style={{ color: primaryColor }} />,
    path: "todolist",
    subMenus: [],
  },
];