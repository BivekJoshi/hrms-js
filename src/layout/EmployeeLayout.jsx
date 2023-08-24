import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";

const EmployeeLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const list = (
    <Box
      sx={{ width: "250px" }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Stack sx={{ display: "flex", flexDirection: "column" }} spacing={8}>
        <Button onClick={toggleDrawer}>
          <CloseIcon />
        </Button>
        <Divider />
        <Stack>
          <List>
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
            <ListItem>hello</ListItem>
          </List>
        </Stack>
        <Divider />

        <Stack>Logout</Stack>
      </Stack>
    </Box>
  );

  return (
    <>
      <div>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#01579b",
            color: "#fff",
            fontWeight: "semi-bold",
            alignItems: "center",
          }}
        >
          <Button sx={{color: "#fff"}} onClick={toggleDrawer}><MenuIcon /></Button>
          <Typography>Human Resource Management System</Typography>
          <Typography>Profile</Typography>
        </Stack>
        <Outlet />
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          {list}

        </Drawer>
        
      </div>
    
    </>
  );
};

export default EmployeeLayout;
