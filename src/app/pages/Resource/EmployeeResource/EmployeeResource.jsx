import { Box, Button, Stack } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import {
  useDeleteEmployeeResource,
  useGetEmployeeResource,
} from "../../../hooks/resource/employeeResource/useEmployeeResource";
import tableIcons from "../../../../theme/overrides/TableIcon";
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
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import PermissionHoc from "../../../hoc/permissionHoc";
import HocButton from "../../../hoc/hocButton";

const EmployeeResource = ({ permissions }) => {
  const navigate = useNavigate();
  const { data: employeeResourceData, isLoading } = useGetEmployeeResource();
  const { data: officeResourceData } = useGetOfficeResource();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();

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
    const employeeId = rowData?.id;
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
      sortable: false,
      sorting: false,
    },
    {
      title: "Employee Name",
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)} </p>;
      },
      customFilterAndSearch: (searchValue, rowData) => {
        const employeeName = getEmployeeName(rowData);
        return employeeName.toLowerCase().includes(searchValue.toLowerCase());
      },
      width: 120,
      sorting: false,
    },
    {
      title: "Resource",
      render: (rowData) => {
        return <p>{getResourceName(rowData)}</p>;
      },
      // customFilterAndSearch: (searchValue, rowData) => {
      //   const resourceName = getResourceName(rowData);
      //   return resourceName.toLowerCase().includes(searchValue.toLowerCase());
      // },
      width: "20vh",
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
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <HocButton
            permissions={permissions}
            onClick={() => handleEditRowData(rowData)}
            icon={<ModeEditOutlineIcon />}
          />
          <HocButton
            permissions={permissions}
            onClick={() =>handleDeleteRowData(rowData)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,
      width: 120,
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
          color= {"primary"}
          variant={"outlined"}
          onClick={() => {
            navigate(`/admin/resource/office`);
          }}
          buttonName={"Logistics"}
        />
        <HocButton
          permissions={permissions}
          color= {"primary"}
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+Provide Logistics to Employee"}
        />
      </Box>

      <MaterialTable
        icons={tableIcons}
        title="Employee Logistics"
        columns={columns}
        data={employeeResourceData}
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 20,
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
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditEmployeeResourceModal
          id={editedEmployeeResouce?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(EmployeeResource);
