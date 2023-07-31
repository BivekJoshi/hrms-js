import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { Box, Button, Chip, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import {
  useGetTodoList,
  useDeleteTodoList,
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
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
    },
    {
      title: "Message",
      field: "message",
      width: 80
    },
    {
      title: "Due",
      field: "dueDate",
      width: 80,
      type: 'numeric',
    },
    {
      title: 'Priority',
      field: 'priority',
      emptyValue: '-',
      width: 100,
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      render: (rowData) => {
        const priority = rowData.priority;
        let chipColor = "";

        if (priority === "HIGH") {
          chipColor = "green";
        } else if (priority === "MEDIUM") {
          chipColor = "red";
        } else if (priority === "LOW") {
          chipColor = "orange";
        }

        return (
          <Chip label={priority} style={{ backgroundColor: chipColor, color: "white", width: ' 9rem' }} />
        );
      },

    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleEditTodoList(rowData)}>
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => handleDeleteTodoList(rowData.id)}
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
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
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
            backgroundColor: "#01579b",
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