import * as React from "react";
import { useState } from "react";

import MaterialTable from "@material-table/core";
import { Box, Button, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import { useGetTodoList } from "../../hooks/todoList/useTodoList";
import { AddTodoModal } from "./TodoModal/TodoModal";

const TodoList = () => {
  const { data: todoListData, isLoading } = useGetTodoList();

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const column = [
    { title: "SN", field: "id", width: 80 },
    { title: "Message", field: "message", width: 80 },
    { title: "SN", field: "userId", width: 80 },
    { title: "Actions", field: "Edit", width: 60 },
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
        columns={column}
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

      {openAddModal && (
        <AddTodoModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default TodoList;
