import React, { useState } from "react";

import MaterialTable from "@material-table/core";
import { Box, Button, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import {
  useGetTodoList,
  useDeleteTodoList,
  useGetTodoListById,
} from "../../hooks/todoList/useTodoList";
import { AddTodoListModal, EditTodoListModal } from "./TodoModal/TodoModal";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const TodoList = () => {
  const { data: todoListData, isLoading } = useGetTodoList();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editedTodo, setEditedTodo] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const deleteTodoListMutation = useDeleteTodoList({});

  const handleDeleteTodoList = (userId) => {
    deleteTodoListMutation.mutate(userId);
  };

  const handleEditTodoList = (rowData) => {
    setEditedTodo(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    // {
    //   title: "SN",
    //   render: (rowData) => rowData.id,
    //   cellStyle: {
    //     whiteSpace: "nowrap",
    //   },
    //   width: 80,
    // },
    { title: "SN", field: "id", width: 80 },
    { title: "Message", field: "message", width: 80 },
    { title: "UserID", field: "userId", width: 80 },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleEditTodoList(rowData)}>
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => handleDeleteTodoList(rowData.userId)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 80,
    },
  ];

  if (isLoading)
    return (
      <>
        <Box sx={{ width: 968 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </>
    );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          + Add Todo
        </Button>
      </Box>
      <br />
      <MaterialTable
        columns={columns}
        data={todoListData}
        title="Todo List"
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: 20,
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />

      {openEditModal && (
        <EditTodoListModal
          id={editedTodo?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      {openAddModal && (
        <AddTodoListModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default TodoList;
