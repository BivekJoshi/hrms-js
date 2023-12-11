import React, { useState } from 'react';
import {
  useDeleteRole,
  useGetRole,
} from '../../../../hooks/auth/roles/useRole';
import { Box, Button, Typography, Stack } from '@mui/material';
import { AddRoleModal, EditRoleModal } from './AddRoleModal';
import DeleteConfirmationModal from '../../../../components/Modal/DeleteConfirmationModal';

const Roles = () => {
  const { data: roleData } = useGetRole();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedRole, setEditedRole] = useState({});
  const [deletedRole, setDeletedRole] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getRoleStyle = (roleName) => {
    switch (roleName) {
      case 'ROLE_SUPER_ADMIN':
        return { name: 'Super Admin' };
      case 'ROLE_MANAGER':
        return { name: 'Manager' };
      case 'ROLE_ADMIN':
        return { name: 'Admin' };
      case 'ROLE_HR_ADMIN':
        return { name: 'HR Admin' };
      case 'ROLE_HR_CLERK':
        return { name: 'HR Clerk' };
      case 'ROLE_EMPLOYEE':
        return { name: 'Employee' };
      case 'CLIENT':
        return { name: 'Client' };
      default:
        return { name: roleName };
    }
  };

  const handleEditRole = (roleId) => {
    setEditedRole(roleId);
    setOpenEditModal(true);
  };

  const deleteRoleMutation = useDeleteRole({});
  const handleDeleteRole = (roleId) => {
    setDeletedRole(roleId);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRoleMutation.mutate(deletedRole);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginY: '1rem',
        }}
      >
        <Stack sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {/* <Button
            color="primary"
            variant="contained"
            sx={{ maxWidth: "fit-content" }}
            onClick={handleAddOpenModal}
          >
            Add
          </Button> */}
        </Stack>
        {roleData &&
          roleData.map((role, index) => {
            const { name } = getRoleStyle(role?.name);
            return (
              <Stack
                key={index}
                sx={{
                  alignItems: 'center',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: '#393939',
                }}
              >
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {name}
                  </Typography>
                </div>

                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '0.7rem',
                  }}
                >
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => handleEditRole(role?.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color='error'
                    variant='contained'
                    onClick={() => handleDeleteRole(role?.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            );
          })}
      </Box>
      {openAddModal && (
        <AddRoleModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditRoleModal
          id={editedRole}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Role'}
        />
      )}
    </>
  );
};

export default Roles;
