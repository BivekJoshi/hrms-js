import React, { useState } from 'react';
import { Box, Button, Chip, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import {
  useGetTodoList,
  useDeleteTodoList,
} from '../../hooks/todoList/useTodoList';
import { AddTodoListModal, EditTodoListModal } from './TodoModal/TodoModal';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { ButtonComponent } from '../../components/Button/ButtonComponent';
import PermissionHoc from '../../hoc/permissionHoc';
import HocButton from '../../hoc/hocButton';
import CustomTable from '../../components/CustomTable/CustomTable';

const TodoList = ({ permissions }) => {
  const { data: todoListData, isLoading } = useGetTodoList();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editedTodo, setEditedTodo] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const deleteTodoListMutation = useDeleteTodoList({});

  const handleDeleteTodoList = (id) => {
    deleteTodoListMutation.mutate(id);
  };

  const handleEditTodoList = (rowData) => {
    setEditedTodo(rowData);
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
      title: 'Task',
      field: 'message',
      width: '400px',
      sorting: false,
      render: (rowData) => (
        <div
          style={{
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          {rowData?.message}
        </div>
      ),
    },
    {
      title: 'Due',
      field: 'dueDate',
      width: '180px',
      // type: 'numeric',
      sorting: false,
    },
    {
      title: 'Priority',
      field: 'priority',
      emptyValue: '-',
      width: '180px',
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      sorting: false,
      render: (rowData) => {
        const priority = rowData?.priority;
        let chipColor = '';

        if (priority === 'HIGH') {
          chipColor = 'red';
        } else if (priority === 'MEDIUM') {
          chipColor = 'orange';
        } else if (priority === 'LOW') {
          chipColor = 'green';
        }

        return (
          <Chip
            label={priority}
            style={{
              backgroundColor: chipColor,
              color: 'white',
              width: ' 9rem',
            }}
          />
        );
      },
    },
  ];

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
      tooltip: 'Edit to do',
      onClick: (event, rowData) => handleEditTodoList(rowData),
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
      tooltip: 'Delete to do',
      onClick: (event, rowData) => handleDeleteTodoList(rowData.id),
    },
  ];

  if (isLoading)
    return (
      <>
        <Skeleton />
        <Skeleton animation='wave' />
        <Skeleton animation={false} />
      </>
    );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonComponent
          OnClick={handleAddOpenModal}
          buttonName={'Add Todo'}
          color='#fff'
        />
      </Box>
      <CustomTable
        columns={columns}
        data={todoListData}
        title='Todo List'
        isLoading={isLoading}
        actions={actions}
      />

      {openEditModal && (
        <EditTodoListModal
          title={'Edit Todo List'}
          data={editedTodo}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      {openAddModal && (
        <AddTodoListModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={'Add Todo List'}
        />
      )}
    </>
  );
};

export default PermissionHoc(TodoList);
