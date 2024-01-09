import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  useDeleteDesignation,
  useGetDesignation,
} from '../../hooks/designation/useDesignation';
import {
  AddDesignationModal,
  EditDesignationModal,
} from './DesignationModal/DesignationModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import PermissionHoc from '../../hoc/permissionHoc';
import HocButton from '../../hoc/hocButton';
import CustomTable from '../../components/CustomTable/CustomTable';

const Designation = ({ permissions }) => {
  const { data: designationData, isLoading } = useGetDesignation();
  const { palette } = React.useContext(ThemeModeContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedDesignation, setEditedDesignation] = useState({});
  const [deletedDesignation, setDeletedDesignation] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { deleteDesignationMutation, isSuccess: isDeleteSuccess } =
    useDeleteDesignation({});

  const handleDeleteDesignation = (rowData) => {
    setDeletedDesignation(rowData);
    setOpenDeleteModal(true);
  };

  React.useEffect(() => {
    if (isDeleteSuccess) {
      setOpenDeleteModal(false);
    }
  }, [isDeleteSuccess]);

  const handleConfirmDelete = () => {
    deleteDesignationMutation(deletedDesignation.id);
  };

  const handleEditDesignation = (rowData) => {
    setEditedDesignation(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: '1px',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Designation Name',
      field: 'positionName',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Designation Level',
      field: 'positionLevel',
      emptyValue: '-',
      width: 200,
      sorting: false,
    },
    {
      title: 'Salary',
      field: 'salary',
      emptyValue: '-',
      width: 80,
      sorting: false,
    },
    {
      title: 'Details',
      field: 'positionDetails',
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
      disabled: !permissions?.canEdit,
      tooltip: "Edit Detail",
      onClick: (event, rowData) => handleEditDesignation(rowData),
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

      tooltip: 'Delete',
      onClick: (event, rowData) => handleDeleteDesignation(rowData),
    },
  ];
  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HocButton
          permissions={permissions?.canAdd}
          color={'white'}
          variant={'contained'}
          onClick={handleAddOpenModal}
          buttonName={'+ Add Designation'}
        />
      </Box>
      <br />
      <CustomTable
        columns={columns}
        data={designationData}
        title='Designation List'
        isLoading={isLoading}
        actions={actions}
      />

      {openEditModal && (
        <EditDesignationModal
          title={'Edit Designation'}
          // id={editedDesignation?.id}
          data={editedDesignation}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddDesignationModal
          title={'Add Designation'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Designation'}
        />
      )}
    </>
  );
};

export default PermissionHoc(Designation);
