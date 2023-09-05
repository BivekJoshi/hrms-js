import * as React from "react";
import { useState } from "react";
import MaterialTable from "material-table";
import { Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  useDeleteDepartment,
  useGetDepartment,
} from "../../hooks/department/useDepartment";
import {
  AddDepartmentModal,
  EditDepartmentModal,
} from "./DepartmentModal/DepartmentModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import tableIcons from "../../../theme/overrides/TableIcon";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";

const Department = ({ permissions }) => {
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

  const deleteDepartmentMutation = useDeleteDepartment({});
  const handleDeleteDepartment = (rowData) => {
    setDeletedDepartment(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteDepartmentMutation.mutate(deletedDepartment.id);
    setOpenDeleteModal(false);
  };

  const handleEditDepartment = (rowData) => {
    setEditedDepartment(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Department Name",
      field: "departmentName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Department Type",
      field: "departmentType",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Description",
      field: "departmentDescription",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <HocButton
            permissions={permissions?.canEdit}
            onClick={() =>handleEditDepartment(rowData)}
            icon={<ModeEditOutlineIcon />}
          />
          <HocButton
            permissions={permissions?.canDelete}
            onClick={() =>handleDeleteDepartment(rowData)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,
    },
  ].filter(Boolean);

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HocButton
          permissions={permissions?.canAdd}
          color= {"primary"}
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+ Add Department"}
        />
      </Box>

      <br></br>

      <MaterialTable
        icons={tableIcons}
        title="Department Data"
        columns={columns}
        data={departmentData}
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 10,
          tableLayout: "auto",
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
      />

      {openEditModal && (
        <EditDepartmentModal
          id={editedDepartment?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddDepartmentModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Department"}
        />
      )}
    </>
  );
};
export default PermissionHoc(Department);
