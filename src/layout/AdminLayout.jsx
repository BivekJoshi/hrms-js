import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <div>sidebar</div> <Outlet />
    </>
  );
};

export default AdminLayout;
