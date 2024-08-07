import React, { useContext, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import ApprovalOutlinedIcon from "@mui/icons-material/ApprovalOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailIcon from "@mui/icons-material/Mail";
import DvrIcon from "@mui/icons-material/Dvr";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import DevicesIcon from "@mui/icons-material/Devices";
import CakeIcon from "@mui/icons-material/Cake";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddchartIcon from "@mui/icons-material/Addchart";
import EventIcon from "@mui/icons-material/Event";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ListItemIcon } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import { styled } from "@mui/material/styles";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import BadgeIcon from "@mui/icons-material/Badge";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItemButton,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ListItemText, Collapse, IconButton } from "@mui/material/";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Card, Fab, Switch, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ThemeModeContext } from "../../../theme/ThemeModeContext";
import AdminHeader from "../Header/AdminHeader";
import { getUser, removeUser } from "../../utils/cookieHelper";
import Footer from "../footer/Footer";
import jwtDecode from "jwt-decode";
// import BreadCrumbs from '../../../routes/routes';
import Logo from "../../../assets/logo.png";
import SmallLogo from "../../../assets/smallLogo.png";
import { useGetLoggedInUser } from "../../hooks/auth/usePassword";
import BreadCrumbs from "../../../routes/routes";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth + 24}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: "-24px",
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { mode, palette } = useContext(ThemeModeContext);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { pathname } = useLocation();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRole;
  const { data: loggedUserData } = useGetLoggedInUser();

  const drawerMenusForAdmin = [
    {
      name: "Dashboard",
      icon: (
        <DashboardIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "dashboard",
      subMenus: [],
    },
    {
      name: "Employee",
      icon: (
        <PeopleAltIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "employee",
      subMenus: [
        {
          name: "Leave",
          path: "employee/leaves",
          icon: (
            <TimeToLeaveIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },

        {
          name: "Attendance",
          path: "employee/attendance",
          icon: (
            <HowToRegIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
        {
          name: "Birthday",
          path: "employee/birthday",
          icon: (
            <CakeIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
      ],
    },
    {
      name: "Logistics",
      icon: (
        <DvrIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "logistics",
      subMenus: [
        {
          name: "Logistics",
          path: "availablelogistics",
          icon: (
            <LaptopChromebookIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
        {
          name: "Provide Logistics",
          path: "logistics",
          icon: (
            <DevicesIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
      ],
    },

    {
      name: "Project",
      icon: (
        <AddchartIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "projects",
      subMenus: [],
    },
    {
      name: "Event",
      icon: (
        <EventIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "event",
      subMenus: [
        {
          name: "Event Attendance",
          path: "event/attendance",
          icon: (
            <TodayIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
      ],
    },
    {
      name: "Holiday",
      icon: (
        <HolidayVillageIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "holiday",
      subMenus: [],
    },
    {
      name: "Todo List",
      icon: (
        <PlaylistAddCheckIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "todolist",
      subMenus: [],
    },
    {
      name: "Users",
      icon: (
        <PersonAddIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "users",
      subMenus: [],
    },
    {
      name: "Setup & Configuration",
      icon: (
        <SettingsApplicationsIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      // path: "setup-configuration",
      subMenus: [
        {
          name: "Leave Type",
          path: "leaveType",
          icon: (
            <MailIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
        },
        {
          name: "Department",
          icon: (
            <WorkspacesIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "department",
        },
        {
          name: "Designation",
          icon: (
            <AssignmentIndIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "designation",
        },
        {
          name: "Branch",
          icon: (
            <BusinessIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "branch",
        },
        {
          name: "Employment Type",
          icon: (
            <BadgeIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "employment-type",
          subMenus: [],
        },
        {
          name: "Employee Mapping",
          icon: (
            <PeopleIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "mapping",
          subMenus: [],
        },
        {
          name: "Work Schedule",
          icon: (
            <WorkHistoryIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "work-schedule",
          subMenus: [],
        },
        {
          name: "Email Log",
          icon: (
            <MarkEmailUnreadOutlinedIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "mail-log",
          subMenus: [],
        },
        {
          name: "Setting",
          icon: (
            <SettingsIcon
              sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
            />
          ),
          path: "email",
        },
      ],
    },
    // {
    //   name: "Reports",
    //   icon: (
    //     <AssessmentIcon
    //       sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
    //     />
    //   ),
    //   path: "reports",
    //   subMenus: [],
    // },
  ];

  const drawerMenusForEmployee = [
    {
      name: "Dashboard",
      icon: (
        <DashboardIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "home",
      subMenus: [],
    },
    {
      name: "My Profile",
      icon: (
        <AccountCircleOutlinedIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "profile",
      subMenus: [],
    },
    {
      name: "My Attendence",
      path: "presence",
      icon: (
        <CoPresentOutlinedIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      subMenus: [],
    },
    {
      name: "Leave History",
      path: "leaveHistory",
      icon: (
        <HistoryIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      subMenus: [],
    },
    {
      name: "Apply Leave",
      path: "applyleave",
      icon: (
        <ApprovalOutlinedIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      subMenus: [],
    },
    {
      name: "Project",
      icon: (
        <AddchartIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "project",
      subMenus: [],
    },
    {
      name: "Event",
      icon: (
        <EventIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "event",
      subMenus: [],
    },
    {
      name: "Holiday",
      icon: (
        <HolidayVillageIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "holiday",
      subMenus: [],
    },
    {
      name: "Todo",
      icon: (
        <PlaylistAddCheckIcon
          sx={mode === "light" ? { color: "#6DAB23" } : { color: "white" }}
        />
      ),
      path: "todolist",
      subMenus: [],
    },
  ];

  const filteredDrawerMenus = drawerMenusForAdmin.filter(
    (menu) => menu?.path !== "email" && menu?.path !== "mail-log"
  );

  const drawerMenus =
    userRole === "ROLE_SUPER_ADMIN" || userRole === "ROLE_ADMIN"
      ? drawerMenusForAdmin
      : userRole === "ROLE_MANAGER" ||
        userRole === "ROLE_HR" ||
        userRole === "ROLE_HR_ADMIN" ||
        userRole === "ROLE_HR_CLERK"
      ? filteredDrawerMenus
      : drawerMenusForEmployee;

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
    <Box sx={{ display: "flex" }}>
      <AdminHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
        loggedUserData={loggedUserData}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src={mode === "dark" ? SmallLogo : Logo}
            alt="Logo"
            width={mode === "dark" ? "20%" : "70%"}
          />
          {mode === "dark" && (
            <Typography variant="h8">Secured Securities Ltd</Typography>
          )}
          <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "2rem" }}>
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
                      pathname.includes(menu.path) &&
                      // menu.item == "employee" &&
                      palette?.background?.activetabBg,
                  }}
                >
                  <ListItemIcon
                    sx={
                      mode === "light"
                        ? { color: "Light", minWidth: "40px" }
                        : { color: "White" }
                    }
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.name}
                    sx={
                      mode === "light" ? { color: "black" } : { color: "white" }
                    }
                  />
                  {menu.subMenus.length > 0 ? (
                    subMenuOpen[index] ? (
                      <ExpandLess
                        sx={
                          mode === "light"
                            ? { color: "black" }
                            : { color: "white" }
                        }
                      />
                    ) : (
                      <ExpandMore
                        sx={
                          mode === "light"
                            ? { color: "black" }
                            : { color: "white" }
                        }
                      />
                    )
                  ) : null}
                </ListItemButton>
              </StyledNavLink>
              {menu.subMenus.length > 0 && (
                <Collapse in={subMenuOpen[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((subMenu, subIndex) => {
                      return (
                        <StyledNavLink key={subIndex} to={subMenu.path}>
                          <ListItemButton
                            sx={{
                              backgroundColor:
                                pathname.includes(subMenu.path) &&
                                palette?.background?.tabbg,
                              color: mode === "dark" && "white",
                            }}
                          >
                            <ListItemIcon>{subMenu.icon}</ListItemIcon>
                            <ListItemText primary={subMenu.name} />
                          </ListItemButton>
                        </StyledNavLink>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              removeUser();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {/* <br /> */}

        <Card
          variant="elevation"
          sx={{
            maxWidth: "100%",
            marginLeft: "24px",
            padding: "20px",
            boxSizing: "border-box",
            "@media (min-width: 600px)": {
              maxWidth: open ? "calc(100% - drawerWidth)" : "100%",
            },
          }}
        >
          <Box display="flex" marginBottom={"8px"}>
            <BreadCrumbs />
          </Box>
          <div style={{ minHeight: "90vh" }}>
            <Outlet />
          </div>
        </Card>
        <Footer />
      </Main>
    </Box>
  );
}
