import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Button,
  List,
  Divider,
  Box,
  ListItemButton,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SmallDrawerComponent = ({
  open,
  drawerMenus,
  pathname,
  StyledNavLink,
  onClose,
  onOpen,
  mode
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const handleSubMenuToggle = (index) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box sx={{ width: 250 }}>
        <Button onClick={onClose}>
          <ChevronLeftIcon />
        </Button>
        <Divider />
        <List>
          {drawerMenus?.map((menu, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => handleSubMenuToggle(index)}
                sx={{
                  backgroundColor:
                    pathname.includes(menu.path) &&
                    menu.item == "employee" &&
                    "#ace8639e",
                }}
              >
                {/* ... (your menu item rendering code) */}
              </ListItemButton>
              {menu.subMenus.length > 0 && (
                <Collapse in={subMenuOpen[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <StyledNavLink key={subIndex} to={subMenu.path}>
                        <ListItemButton
                          sx={{
                            backgroundColor:
                              pathname.includes(subMenu.path) && "#ace8639e",
                            color: mode === "dark" && "white",
                          }}
                        >
                          {/* ... (your sub-menu item rendering code) */}
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
          {/* ... (your logout button and mode switch code) */}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

// Usage
const anchors = ["left", "right", "top", "bottom"];

const DrawerMenu = () => {
  const [state, setState] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
    {anchors.map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        {/* Corrected component name below */}
        <SmallDrawerComponent
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
          drawerMenus={drawerMenus} // Pass your drawerMenus array
        />
      </React.Fragment>
    ))}
    </>
  );
};

export default SmallDrawerComponent;
