import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  useDeleteProjectEmployee,
  useGetProjectEmployeeById,
} from "../../../hooks/project/projectEmployee/useProjectEmployee";
import { useParams } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Box, Button, Grid, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { AddProjectEmployeeModal, EditProjectEmployeeModal } from "../ProjectEmployee/ProjectEmployeeModal/ProjectEmployeeModal";
import { useGetProject } from "../../../hooks/project/useProject";
import EditIcon from "@mui/icons-material/Edit";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: projectEmployeeData, isLoading } =
    useGetProjectEmployeeById(id);
  const { data: employeeData } = useGetEmployee();
  const { data: projectData } = useGetProject();

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [deletedProjectEmployee, setDeletedProjectEmployee] = useState({});

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData?.find((emp) => emp.id == employeeId);
    const name = `${employee?.firstName} ${employee?.lastName}`;
    return name;
  };

  const getLeaderName = (rowData) => {
    const projectId = rowData.projectId;
    const project = projectData?.find((prj) => prj.id == projectId);
    const name = `${project?.projectName}`;
    return name;
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});
  const handleEditProjectEmployee = (rowData) => {
    setEditedEmployee(rowData);
    setOpenEditModal(true);
  };

  const deleteProjectEmployeeMutation = useDeleteProjectEmployee({});
  const handleDeleteProjectEmployee = (rowData) => {
    setDeletedProjectEmployee(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteProjectEmployeeMutation.mutate(deletedProjectEmployee.id);
    setOpenDeleteModal(false);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
    },
    {
      title: "Employee Name",
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)}</p>;
      },
      width: 80,
    },
    {
      title: "Assigned On",
      field: "assignedOn",
      emptyValue: "-",
      width: 80,
    },
    {
      title: "Deassigned On",
      field: "deAssignedOn",
      emptyValue: "-",
      width: 80,
    },
    {
      title: "Project Status",
      field: "onProject",
      emptyValue: "-",
      width: 80,
    },
    {
      title: "project Name",
      field: "projectId",
      render: (rowData) => {
        return <p>{getLeaderName(rowData)}</p>;
      },
      width: 80,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          {/* <Button color="primary" onClick={() => handleEditProjectEmployee(rowData)}>
            <EditIcon />
          </Button> */}
          <Button
            color="primary"
            onClick={() => handleDeleteProjectEmployee(rowData)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 100,
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
          }}
        >
          Assign Projects
          <Button variant="contained" onClick={handleAddOpenModal}>
            +Add Employee
          </Button>
        </Typography>
      </Box>
      <br />
      <MaterialTable
        columns={columns}
        data={projectEmployeeData}
        title="Project Employee Data"
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
      />
      {openAddModal && (
        <AddProjectEmployeeModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      
      {openEditModal && (
        <EditProjectEmployeeModal
          id={editedEmployee?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"projectEmployee"}
        />
      )}
    </>
  );
};

export default ProjectDetail;
