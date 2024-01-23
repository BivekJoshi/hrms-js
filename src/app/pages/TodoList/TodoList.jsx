import React, { useContext, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import {
  useGetTodoList,
  useDeleteTodoList,
} from "../../hooks/todoList/useTodoList";
import { AddTodoListModal, EditTodoListModal } from "./TodoModal/TodoModal";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import PermissionHoc from "../../hoc/permissionHoc";
import CustomTable from "../../components/CustomTable/CustomTable";
import ThemeModeContext from "../../../theme/ThemeModeContext";

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
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: "8px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Task",
      field: "message",
      minWidth: "500px",
      sorting: false,
      render: (rowData) => {
        return (
          <Typography style={{ overflowWrap: "break-word", wordBreak:"break-all" }}>
            {rowData.message}
          </Typography>
        );
      },
    },
    {
      title: "Due",
      field: "dueDate",
      width: "100px",
      // type: 'numeric',
      sorting: false,
    },
    {
      title: "Priority",
      field: "priority",
      emptyValue: "-",
      width: "50px",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
      },
      sorting: false,
      render: (rowData) => {
        const priority = rowData?.priority;
        let chipColor = "";

        if (priority === "HIGH") {
          chipColor = "red";
        } else if (priority === "MEDIUM") {
          chipColor = "orange";
        } else if (priority === "LOW") {
          chipColor = "green";
        }``

        return (
          <Chip
            label={priority}
            style={{
              backgroundColor: chipColor,
              color: "white",
              width: " 6rem",
            }}
          />
        );
      },
    },
  ];

  const { mode } = useContext(ThemeModeContext);
  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      tooltip: "Edit to do",
      onClick: (event, rowData) => handleEditTodoList(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "red",
            },
          }}
        />
      ),
      tooltip: "Delete to do",
      onClick: (event, rowData) => handleDeleteTodoList(rowData.id),
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
        <ButtonComponent
          OnClick={handleAddOpenModal}
          buttonName={"Add Todo"}
          color="#fff"
        />
      </Box>
      <CustomTable
        columns={columns}
        data={todoListData}
        title="Todo List"
        isLoading={isLoading}
        actions={actions}
      />

      {openEditModal && (
        <EditTodoListModal
          title={"Edit Todo List"}
          data={editedTodo}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      {openAddModal && (
        <AddTodoListModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={"Add Todo List"}
        />
      )}
      <style>
        {`
        .css-a80liw-MuiTableCell-root{
          text-align: center;
        }
        `}
      </style>
    </>
  );
};

export default PermissionHoc(TodoList);
