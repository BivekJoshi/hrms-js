// import {
//   Box,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
// import MenuIcon from '@mui/icons-material/Menu';
// import React, { useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import EmployeeSidebar from "../app/components/SideBar/EmployeeSidebar";

// const EmployeeLayout = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const list = (
//     <Box
//       sx={{ width: "250px", height: "100vh", overflow: "scroll", backgroundColor: "#e1e1e1" }}
//       role="presentation"
//       onClick={toggleDrawer}
//       onKeyDown={toggleDrawer}
      
//     >
//       <Stack spacing={2}>
//         <Button onClick={toggleDrawer}>
//           <CloseIcon />
//         </Button>
//         <Divider />
//         <EmployeeSidebar />
//         <Divider />

//         <Stack>Logout</Stack>
//       </Stack>
//     </Box>
//   );

//   return (
//     <>
//       <div sx={{padding: "4rem"}}>
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             backgroundColor: "#01579b",
//             color: "#fff",
//             alignItems: "center",
//             paddingY: "0.5rem",
//             paddingX: "2rem",
//           }}
//         >
//           <Button sx={{color: "#fff"}} onClick={toggleDrawer}><MenuIcon sx={{ fontSize: 32 }} /></Button>
//           <Typography variant="h6">Human Resource Management System</Typography>
//           <Typography variant="h6">Profile</Typography>
//         </Stack>
//         <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
//           {list}

//         </Drawer>
//         <Outlet />
        
        
//       </div>
    
//     </>
//   );
// };

// export default EmployeeLayout;


import React from 'react';
import { Box } from '@mui/material';
import EmployeeSidebar from '../app/components/SideBar/EmployeeSideBar';

const EmployeeLayout = () => {
  return (
    <Box minHeight="100vh">
      <EmployeeSidebar />
    </Box>
  );
};

export default EmployeeLayout;
