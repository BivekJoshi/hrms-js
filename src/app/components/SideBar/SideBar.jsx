import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CakeOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Badge, Button, Card, Collapse, Switch } from "@mui/material";
import { ThemeModeContext } from "../../../theme/ThemeModeContext";
import { removeUser } from "../../utils/cookieHelper";
import { useGetTodayBirthday } from "../../hooks/birthday/useBirthday";
import TodayBirthday from "../../pages/Birthday/TodayBirthday";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
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
      color: #1626c9;
    }
  }
`;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { toggleMode, themeMode } = useContext(ThemeModeContext); // Accessing themeMode from context
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const { data, isLoading } = useGetTodayBirthday();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuToggle = (index) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const drawerMenus = [
    {
      name: "Dashboard",
      icon: <InboxIcon />,
      path: "dashboard",
      subMenus: [],
    },
    {
      name: "Employee",
      icon: <MailIcon />,
      path: "employee",
      subMenus: [
        {
          name: "Add Employee",
          path: "employee/add",
          icon: <InboxIcon />,
        },
        {
          name: "Employee",
          path: "employee/add",
          icon: <InboxIcon />,
        },
        {
          name: "Leave",
          path: "leave",
          icon: <InboxIcon />,
        },
        {
          name: "Leave Type",
          path: "leavetype",
          icon: <InboxIcon />,
        },
        {
          name: "Attendance",
          path: "employee/add",
          icon: <InboxIcon />,
        },
        {
          name: "Birthday",
          icon: <InboxIcon />,
          path: "birthday",
        },
      ],
    },
    {
      name: "Department",
      icon: <InboxIcon />,
      path: "department",
      subMenus: [],
    },
    {
      name: "Designation",
      icon: <InboxIcon />,
      path: "designation",
      subMenus: [],
    },
    {
      name: "Company",
      icon: <InboxIcon />,
      path: "company",
      subMenus: [],
    },
    {
      name: "ToDo List",
      icon: <InboxIcon />,
      path: "todolist",
      subMenus: [],
    },
  ];
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeen, setNotificationSeen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const handleChange = () => {
    setOpenNotification(!openNotification);
    setNotificationSeen(true);
  };
  // const handleClose = () => {
  //   setOpenNotification(false);
  // };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="h6" noWrap component="div">
              Human Resource Management System
            </Typography>
            <div
              style={{
                Color: "white",
                display: "flex",
                position: "absolute",
                right: "100px",
                top: "30px",
                width: "30px",
              }}
            >
              <div>
                <Badge color="secondary" badgeContent={data?.length}>
                  <CakeOutlined
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleChange}
                    style={{ color: "white", cursor: "pointer" }}
                  />
                </Badge>
                {openNotification && (
                  <TodayBirthday
                    data={data}
                    isLoading={isLoading}
                    open={openNotification}
                    setOpen={setOpenNotification}
                    notificationSeen={notificationSeen}
                    setNotificationSeen={setNotificationSeen}
                  />
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
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
                <Collapse in={subMenuOpen[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              removeUser(navigate);
            }}
          >
            Logout
          </Button>
          <Typography variant="body2" sx={{ marginRight: "8px" }}>
            {themeMode === "light" ? "Light" : "Dark"} Mode
          </Typography>
          <Switch
            checked={themeMode === "dark"}
            onChange={toggleMode}
            color="primary"
          />
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Card
          variant="outlined"
          sx={{
            width: open ? "calc(100% - drawerWidth)" : "100%",
            padding: "20px",
          }}
        >
          <Outlet />
        </Card>
      </Main>
    </Box>
  );
}
