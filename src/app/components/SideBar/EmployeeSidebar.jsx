import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailIcon from "@mui/icons-material/Mail";
import CakeIcon from "@mui/icons-material/Cake";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddchartIcon from "@mui/icons-material/Addchart";
import EventIcon from "@mui/icons-material/Event";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LaptopIcon from "@mui/icons-material/Laptop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeeSidebar = () => {
  const navigate = useNavigate();

    const style = {
        display: "flex",
        cursor: "pointer",
        maxWidth: "fit-content",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.4rem",
        '&:hover': {
          background: "blue",
          color: "white",
        }
      };
      
  const drawerMenus = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "dashboard",
      subMenus: [],
    },
    {
      name: "Employee",
      icon: <PeopleAltIcon />,
      path: "employee",
      subMenus: [
        {
          name: "Employee",
          path: "employee",
          icon: <PersonIcon />,
        },
      ],
    },
    {
      name: "Resource",
      icon: <LaptopIcon />,
      path: "resource/employee",
      subMenus: [],
    },
    {
      name: "Department",
      icon: <WorkspacesIcon />,
      path: "department",
      subMenus: [],
    },
    {
      name: "Designation",
      icon: <AssignmentIndIcon />,
      path: "designation",
      subMenus: [],
    },
    {
      name: "Company",
      icon: <BusinessIcon />,
      path: "company",
      subMenus: [],
    },
    {
      name: "Project",
      icon: <AddchartIcon />,
      path: "project",
      subMenus: [],
    },
    {
      name: "Event",
      icon: <EventIcon />,
      path: "event",
      subMenus: [],
    },
    {
      name: "Holiday",
      icon: <HolidayVillageIcon />,
      path: "holiday",
      subMenus: [],
    },
    {
      name: "Todo",
      icon: <PlaylistAddCheckIcon />,
      path: "todolist",
      subMenus: [],
    },
  ];

  const handleClick = (menu) => {
    navigate(`/employee/${menu?.path} `)
  }
  return (
    <>
      {drawerMenus.map((menu) => (
        <List onClick={() => handleClick(menu)} key={menu.name} sx={style}>
          <ListItem>{menu.icon}</ListItem>
          <ListItem>{menu.name}</ListItem>
        </List>
      ))}
    </>
  );
};

export default EmployeeSidebar;
