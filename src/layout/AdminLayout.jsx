import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../app/components/SideBar/SideBar';

const AdminLayout = () => {
  return (
    <>
      <SideBar />
    </>
  );
};

export default AdminLayout;
