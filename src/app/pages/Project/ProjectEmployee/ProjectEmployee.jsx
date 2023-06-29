import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Box, Button, Grid, Stack } from "@mui/material";
import "./projectEmployee.css";
import { AddProjectEmployeeModal } from "./ProjectEmployeeModal/ProjectEmployeeModal";
import { useNavigate } from "react-router-dom";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetProjectEmployee } from "../../hooks/projectEmployee/useProjectEmployee";
import MaterialTable from "@material-table/core";

const ProjectEmployee = () => {
  const navigate = useNavigate();
  const { data: projectEmployeeData, isLoading } = useGetProjectEmployee();
  const { data: employeeData } = useGetEmployee();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedProjectEmployee, setEditedProjectEmployee] = useState({});
  const [deletedProjectEmployee, setDeletedProjectEmployee] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  // const deleteProjectMutation = useDeleteProjectEmployee({});
  // const handleDeleteProjectEmployee = (rowData) => {
  //   setDeletedProjectEmployee(rowData);
  //   setOpenDeleteModal(true);
  // };

  // const handleConfirmDelete = () => {
  //   deleteProjectMutation.mutate(deletedProjectEmployee.id);
  //   setOpenDeleteModal(false);
  // };

  // const handleEditProjectEmployee = (rowData) => {
  //    setEditedProjectEmployee(rowData);
  //   setOpenEditModal(true);
  // };

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData?.find(
      (emp) => emp.id === employeeId
    );
    const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    return name;
  };

 
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
			width: 80,
			sortable: false,
    },
    {
			title: 'assignedOn',
			field: 'assignedOn',
			emptyValue: '-',
			width: 80,
		},
    {
			title: 'deAssignedOn',
			field: 'deAssignedOn',
			emptyValue: '-',
			width: 80,
		},
    {
			title: 'employeeId',
			render: (rowData) => {
        return(
          <p>
            {getEmployeeName(rowData)}
          </p>
          )
      },
			width: 80,
		},
    {
			title: 'onProject',
			field: 'onProject',
			emptyValue: '-',
			width: 80,
		},
    {
			title: 'projectId',
			field: 'projectId',
			emptyValue: '-',
			width: 80,
		},
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleEditProjectEmployee(rowData)}>
						<ModeEditOutlineIcon />
					</Button>
          <Button color="primary" onClick={() => handleDeleteProjectEmployee(rowData)}>
						<DeleteIcon />
					</Button>
        </Stack>
      ),
      sorting: false,
      width: 100,
    },
  ]

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
            +Add Project
          </Button>
        </Typography>
      </Box> <br />
      {/* {JSON.stringify(employeeData)} */}
      <MaterialTable
        columns={columns}
        data={projectEmployeeData}
        title="Project Employee Data"
        isLoading={isLoading}
        options={{
          padding: 'dense',
					margin: 50,
					pageSize: 12,
					emptyRowsWhenPaging: false,
					headerStyle: {
						backgroundColor: '#1c7ed6',
						color: '#FFF',
						fontSize: 20,
						padding: 'dense',
						height: 50,
					},
					rowStyle: {
						fontSize: 18,
					},
        }}
      />

      {/* {openEditModal && (
        <EditProjectEmployeeModal
          id={editedProject?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )} */}

      {openAddModal && (
        <AddProjectEmployeeModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Project"}
        />
      )}
    </>
  );
};

export default ProjectEmployee;