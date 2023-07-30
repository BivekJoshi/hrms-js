import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import "./projectEmployee.css";
import { AddProjectEmployeeModal } from "./ProjectEmployeeModal/ProjectEmployeeModal";
import { useNavigate } from "react-router-dom";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetProjectEmployee } from "../../hooks/projectEmployee/useProjectEmployee";
import MaterialTable from "@material-table/core";

const ProjectEmployee = () => {
  const { data: projectEmployeeData, isLoading } = useGetProjectEmployee();
  const { data: employeeData } = useGetEmployee();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData?.find(
      (emp) => emp.id === employeeId
    );
    const name = `${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`;
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
			title: 'Assigned On',
			field: 'assignedOn',
			emptyValue: '-',
			width: 80,
		},
    {
			title: 'DeAssigned On',
			field: 'deAssignedOn',
			emptyValue: '-',
			width: 80,
		},
    {
			title: 'Employee Name',
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
      <MaterialTable
        columns={columns}
        data={projectEmployeeData}
        title="Project Employee Data"
        isLoading={isLoading}
        options={{
          padding: 'dense',
					margin: 50,
					pageSize: 10,
					emptyRowsWhenPaging: false,
					headerStyle: {
						backgroundColor: '#01579b',
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