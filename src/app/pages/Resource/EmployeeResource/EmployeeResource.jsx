import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import {
  useDeleteEmployeeResource,
  useGetEmployeeResource,
} from "../../../hooks/resource/employeeResource/useEmployeeResource";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import {
  AddEmployeeResourceModal,
  EditEmployeeResourceModal,
} from "./EmployeeResourceModal";
import { useGetOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import PermissionHoc from "../../../hoc/permissionHoc";
import HocButton from "../../../hoc/hocButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";

const EmployeeResource = ({ permissions }) => {
  const navigate = useNavigate();
  const { data: employeeResourceData, isLoading } = useGetEmployeeResource();
  // const { data: officeResourceData } = useGetOfficeResource();
  // const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();

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

  const getEmployeeName = (rowData) => {
    const employeeId = rowData?.empId;
    const employee = employeeData?.find((emp) => emp?.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName
    }`;
    return name;
  };
  const getResourceName = (rowData) => {
    const resourceId = rowData?.officeResourceId;
    const resourceName = officeResourceData?.find(
      (resource) => resource?.id === resourceId
    );
    return resourceName?.name;
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
      title: "Employee Name",
      field: "employeeName",
      emptyValue: "-",
      // render: (rowData) => {
      //   return <p>{getEmployeeName(rowData)} </p>;
      // },
      // customFilterAndSearch: (searchValue, rowData) => {
      //   const employeeName = getEmployeeName(rowData);
      //   return employeeName.toLowerCase().includes(searchValue.toLowerCase());
      // },
      sorting: false,
    },
    {
      title: "Resource",
      field: "officeResourceName",
      emptyValue: "-",
      // render: (rowData) => {
      //   return <p>{getResourceName(rowData)}</p>;
      // },
      // customFilterAndSearch: (searchValue, rowData) => {
      //   const resourceName = getResourceName(rowData);
      //   return resourceName.toLowerCase().includes(searchValue.toLowerCase());
      // },
      sorting: false,
    },
    {
      title: "Received Date",
      field: "receiveDate",
      emptyValue: "-",
      sorting: false,
    },
    {
      title: "Returned Date",
      field: "returnDate",
      emptyValue: "-",
      sorting: false,
    },
  ];
  const actions = [
    {
      icon: () => (
        <HocButton
          permissions={permissions?.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: "Edit Logistics",
      onClick: (event, rowData) => handleEditRowData(rowData),
    },
    {
      icon: () => (
        <HocButton permissions={permissions?.canDelete} icon={<DeleteIcon />} />
      ),
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
          buttonName={"+Provide Logistics"}
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
          title={"Add Logistics"}
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
