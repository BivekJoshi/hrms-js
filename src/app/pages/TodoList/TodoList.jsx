import React, { useState } from "react";
import MaterialTable from "material-table";
import { Box, Button, Chip, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import {
  useGetTodoList,
  useDeleteTodoList,
} from "../../hooks/todoList/useTodoList";
import { AddTodoListModal, EditTodoListModal } from "./TodoModal/TodoModal";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import tableIcons from "../../../theme/overrides/TableIcon";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";

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
      width: "50px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Message",
      field: "message",
      width: "300px",
      sorting: false,
    },
    {
      title: "Due",
      field: "dueDate",
      width: "180px",
      // type: 'numeric',
      sorting: false,
    },
    {
      title: "Priority",
      field: "priority",
      emptyValue: "-",
      width: "180px",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      sorting: false,
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
          <Chip
            label={priority}
            style={{
              backgroundColor: chipColor,
              color: "white",
              width: " 9rem",
            }}
          />
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
          <HocButton
            permissions={permissions?.canDelete}
            color={"primary"}
            onClick={() => handleDeleteTodoList(rowData.id)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,
      width: "3",
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
          buttonName={"+ Add Todo"}
        />
      </Box>
      <br />
      <MaterialTable
        icons={tableIcons}
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
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
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

export default PermissionHoc(TodoList);
