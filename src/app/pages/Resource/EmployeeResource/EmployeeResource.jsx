import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteEmployeeResource } from "../../../hooks/resource/employeeResource/useEmployeeResource";
import { useGetEmployeeResource } from "../../../hooks/resource/employeeResource/useEmployeeResource";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { AddEmployeeResourceModal } from "./EmployeeResourceModal";
import { EditEmployeeResourceModal } from "./EmployeeResourceModal";
import PermissionHoc from "../../../hoc/permissionHoc";
import HocButton from "../../../hoc/hocButton";
import CustomTable from "../../../components/CustomTable/CustomTable";

const EmployeeResource = ({ permissions }) => {
  const { data: employeeResourceData, isLoading } = useGetEmployeeResource();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deletedData, setDeletedData] = useState({});
  const [editedEmployeeResouce, setEditedEmployeeResource] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteRowDataMutation = useDeleteEmployeeResource({});
  const handleDeleteRowData = (rowData) => {
    setDeletedData(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRowDataMutation.mutate(deletedData.id);
    setOpenDeleteModal(false);
  };

  const handleEditRowData = (rowData) => {
    setEditedEmployeeResource(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      maxWidth: "40px",
      sortable: false,
      sorting: false,
    },
    {
      title: 'Employee Name',
      field: 'employee.firstName',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Resource',
      field: 'officeResource.name',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: "Received Date",
      field: "receiveDate",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: 'Device Condition Before',
      field: 'conditionWhileProvided',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Device Condition Before',
      field: 'conditionWhileProvided',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Returned Date',
      field: 'returnDate',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Device Condition After',
      field: 'conditionWhileReturned',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Remarks',
      field: 'remarks',
      emptyValue: '-',
      sorting: false,
    },
  ];
  const actions = [
    {
      icon: () => <ModeEditOutlineIcon style={{ color: "green" }} />,
      disabled: !permissions?.canEdit,
      tooltip: "Edit Logistics",
      onClick: (event, rowData) => handleEditRowData(rowData),
    },
    {
      icon: () => <DeleteIcon style={{ color: "#d32f2f" }} />,
      disabled: !permissions?.canDelete,
      tooltip: "Remove Logistics",
      onClick: (event, rowData) => handleDeleteRowData(rowData),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: ".5rem 0",
        }}
      >
        <HocButton
          permissions={permissions}
          color={"white"}
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+ Provide Logistics"}
        />
      </Box>

      <CustomTable
        columns={columns}
        data={employeeResourceData}
        title="Employee Logistics"
        isLoading={isLoading}
        actions={actions}
        exportButton={true}
      />
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Employee with Resource"}
        />
      )}
      {openAddModal && (
        <AddEmployeeResourceModal
          title={"Provide Logistics"}
          id={editedEmployeeResouce?.id}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditEmployeeResourceModal
          title={"Edit Logistics"}
          data={editedEmployeeResouce}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(EmployeeResource);
