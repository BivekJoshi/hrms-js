import * as React from 'react';
import { useState } from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button,Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';


import { useDeleteDepartment, useGetDepartment } from '../../hooks/department/useDepartment';
import { AddDepartmentModal, EditDepartmentModal } from './DepartmentModal/DepartmentModal';


const Department = () => {
	const { data: departmentData, isLoading } = useGetDepartment();
	
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	const [editedDepartment, setEditedDepartment] = useState({});

	
	const handleAddOpenModal = () => setOpenAddModal(true);
	const handleCloseAddModal = () => setOpenAddModal(false);

	const handleCloseEditModal = () => setOpenEditModal(false);

	const deleteDepartmentMutation = useDeleteDepartment({});
	const handleDeleteDepartment = (departmentId) => {
	  deleteDepartmentMutation.mutate(departmentId);
	};

	const handleEditDepartment = (rowData) => {
		setEditedDepartment(rowData);
		setOpenEditModal(true);
	  };
	const columns = [
		{
			title: 'SN',
			render: (rowData) => rowData.tableData.id,
			cellStyle: {
				whiteSpace: 'nowrap', // Prevents content from wrapping
			},
			width: 80,
		},
		{
			title: 'Department Name',
			field: 'departmentName',
			emptyValue: '-',
			width: 250,
		},
		{
			title: 'Department Type',
			field: 'departmentType',
			emptyValue: '-',
			width: 200,
		},
		{
			title: 'Description',
			field: 'departmentDescription',
			emptyValue: '-',
		},
		{
			title: 'Actions',
			render: (rowData) => (
			  <Stack direction="row" spacing={0}>
				<Button color="primary" onClick={() => handleEditDepartment(rowData)}>
				  <ModeEditOutlineIcon />
				</Button>
				<Button color="primary" onClick={() => handleDeleteDepartment(rowData.id)}>
				  <DeleteIcon />
				</Button>
			  </Stack>
			),
			sorting: false,
			width: 120,
		  },
	];
	if (isLoading) return <>Loading</>;
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
					+Add Department
				</Button>
			</Box>
			<br>
			</br>

			<MaterialTable
				columns={columns}
				data={departmentData}
				title=''
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
				onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
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
		</>
	);
};
export default Department;