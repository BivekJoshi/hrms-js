import { Stack, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import UserControlAction from '../../../../pages/Auth/UserControl/UserControlAction';
import { AddUserControlModal } from './AddUserControlModal';
import { useGetUserControl } from '../../../../hooks/auth/userControl/useUserControl';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';

const roleType = [
  {
    name: 'ROLE_SUPER_ADMIN',
    label: 'Super Admin',
    id: 1,
  },
  {
    name: 'ROLE_ADMIN',
    label: 'Admin',
    id: 2,
  },
  {
    name: 'ROLE_MANAGER',
    label: 'Manager',
    id: 3,
  },
  {
    name: 'ROLE_HR_ADMIN',
    label: 'HR Admin',
    id: 1,
  },
  {
    name: 'ROLE_HR_CLERK',
    label: 'HR Clerk',
    id: 1,
  },
  {
    name: 'ROLE_EMPLOYEE',
    label: 'Employee',
    id: 1,
  },
];

const columns = [
  {
    title: 'SN',
    render: (rowData) => rowData.tableData.id + 1,
    width: '3%',
    sortable: false,
    sorting: false,
  },
  {
    title: 'Name',
    field: 'name',
    emptyValue: '-',
    width: '80',
  },
  {
    title: 'Mobile Number',
    field: 'mobileNo',
    emptyValue: '-',
    width: '80',
  },
  {
    title: 'Email',
    field: 'email',
    emptyValue: '-',
    width: '120',
  },
  {
    title: 'Role',
    render: (rowData) => getRoleLabel(rowData?.role?.name),
    width: '80',
  },
  {
    title: 'Action',
    render: (rowData) => <UserControlAction rowData={rowData} />,
    width: '1rem',
  },
];

const getRoleLabel = (roleName) => {
  const role = roleType?.find((role) => role?.name === roleName);
  return role ? role?.label : '-';
};

const Users = ({ permissions }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { data: userControlData, isLoading } = useGetUserControl();
  const navigate = useNavigate();

  if (permissions?.canView) {
    return (
      <>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              gap: '12px',
            }}
          >
            <Button
              type='button'
              variant='contained'
              sx={{ maxWidth: 'fit-content', color: '#fff' }}
              onClick={handleAddOpenModal}
            >
              + Add User
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                navigate('deactivated');
              }}
              sx={{ textTransform: 'none' }}
            >
              Inactive User
            </Button>
          </Stack>
          <Stack>
            <CustomTable
              columns={columns}
              data={userControlData}
              title='User List'
              isLoading={isLoading}
              // actions={actions}
            />
          </Stack>
        </Stack>

        {openAddModal && (
          <AddUserControlModal
            title={'Add User'}
            open={openAddModal}
            userControlData={userControlData}
            handleCloseModal={handleCloseAddModal}
          />
        )}
      </>
    );
  } else {
    return <>You Donot have permissions to view this page</>;
  }
};

export default Users;
