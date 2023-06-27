import * as React from 'react';
import { useState } from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { useDeleteLeaveType, useGetLeaveType } from '../../hooks/leaveType/useLeaveType';
import { AddLeaveTypeModal, EditLeaveTypeModal } from './LeaveTypeModal/LeaveTypeModal';


const LeaveType = () => {
	const { data: leaveTypeData, isLoading } = useGetLeaveType();

	const [openAddModal, setOpenAddModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	const [editedLeaveType, setEditedLeaveType] = useState({});

	const handleAddOpenModal = () => setOpenAddModal(true);
	const handleCloseAddModal = () => setOpenAddModal(false);

	const handleCloseEditModal = () => setOpenEditModal(false);

	const deleteLeaveTypeMutation = useDeleteLeaveType({});
	const handleDeleteLeaveType = (leavetypeId) => {
		deleteLeaveTypeMutation.mutate(leavetypeId);
	};

	const handleEditLeaveType = (rowData) => {
		setEditedLeaveType(rowData);
		setOpenEditModal(true);
	};


	const columns = [
		{
			title: 'SN',
			render: (rowData) => rowData.tableData.index + 1,
			width: 80,
			sortable: false,
		},
		{
			title: 'Leave Name',
			field: 'leaveName',
			emptyValue: '-',
			width: 200,
		},
		{
			title: 'Total Leave Days',
			field: 'leaveTotal',
			emptyValue: '-',
			width: 150,
		},
		{
			title: 'Carry Forward',
			field: 'isCarryForward',
			emptyValue: '-',
			width: 100,
			render: (rowData) => (rowData.isCarryForward ? 'Yes' : 'No'),
		},
		{
			title: 'Description',
			field: 'leaveDescription',
			emptyValue: '-',
		},
		{
			title: 'Actions',
			render: (rowData) => (
				<Stack direction="row" spacing={0}>
					<Button color="primary" onClick={() => handleEditLeaveType(rowData)}>
						<ModeEditOutlineIcon />
					</Button>
					<Button color="primary" onClick={() => handleDeleteLeaveType(rowData.id)}>
						<DeleteIcon />
					</Button>
				</Stack>
			),
			sorting: false,
			width: 120,
		},
	]
	if (isLoading) return <>Loading</>;
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>+Add Leave Type</Button>
			</Box>
			<br></br>
			<MaterialTable
				columns={columns}
				data={leaveTypeData}
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
			/>
			{openEditModal && (
				<EditLeaveTypeModal
					id={editedLeaveType?.id}
					open={openEditModal}
					handleCloseModal={handleCloseEditModal}
				/>
			)}
			{openAddModal && (
				<AddLeaveTypeModal
					open={openAddModal}
					handleCloseModal={handleCloseAddModal}
				/>
			)}
		</>
	);
};
export default LeaveType;
