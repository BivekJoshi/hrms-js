import * as React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {
  useDeleteDepartment,
  useGetDepartment,
} from '../../hooks/department/useDepartment';
import {
  AddDepartmentModal,
  EditDepartmentModal,
} from './DepartmentModal/DepartmentModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import PermissionHoc from '../../hoc/permissionHoc';
import HocButton from '../../hoc/hocButton';
import useAuth from '../../../auth/hooks/component/login/useAuth';
import CustomTable from '../../components/CustomTable/CustomTable';
import { useEffect } from 'react';

const Department = ({ permissions }) => {
  const { isEmployee } = useAuth();
  const { data: departmentData, isLoading } = useGetDepartment();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedDepartment, setEditedDepartment] = useState({});
  const [deletedDepartment, setDeletedDepartment] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { deleteDepartmentMutation, isSuccess: isDeleteSuccess } =
    useDeleteDepartment({});

  const handleDeleteDepartment = (rowData) => {
    setDeletedDepartment(rowData);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setOpenDeleteModal(false);
    }
  }, [isDeleteSuccess]);

  const handleConfirmDelete = () => {
    deleteDepartmentMutation(deletedDepartment.id);
  };

  const handleEditDepartment = (rowData) => {
    setEditedDepartment(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: '3%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Department Name',
      field: 'departmentName',
      emptyValue: '-',
      width: '20vh',
      sorting: false,
    },
    {
      title: 'Department Type',
      field: 'departmentType',
      emptyValue: '-',
      width: '20vh',
      sorting: false,
    },
    {
      title: 'Description',
      field: 'departmentDescription',
      emptyValue: '-',
      sorting: false,
    },
  ].filter(Boolean);

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: 'black',
            '&:hover': {
              color: 'green',
            },
          }}
        />
      ),
      tooltip: 'Edit Department',
      disabled: !permissions?.canEdit,

      onClick: (event, rowData) => handleEditDepartment(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: 'black',
            '&:hover': {
              color: 'red',
            },
          }}
        />
      ),
      disabled: !permissions?.canDelete,

      tooltip: 'Delete Department',
      onClick: (event, rowData) => handleDeleteDepartment(rowData),
    },
  ];

  if (isEmployee) {
    actions.length = 0;
  }

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HocButton
          permissions={permissions?.canAdd}
          variant={'contained'}
          onClick={handleAddOpenModal}
          buttonName={'Add Department'}
        />
      </Box>

      <br></br>

      <CustomTable
        columns={columns}
        data={departmentData}
        title='Department List'
        isLoading={isLoading}
        exportButton={true}
        actions={actions}
      />

      {openEditModal && (
        <EditDepartmentModal
          title={'Edit Department'}
          // id={editedDepartment?.id}
          data={editedDepartment}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddDepartmentModal
          title={'Add Department'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Department'}
        />
      )}
    </>
  );
};
export default PermissionHoc(Department);
