import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from '../app/components/SideBar/AdminSideBar';

const AdminLayout = () => {
  return (
    <Box minHeight="100vh">
      <AdminSidebar />
    </Box>
  );
};

export default AdminLayout;
