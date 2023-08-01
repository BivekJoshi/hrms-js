import * as React from 'react';
import { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { useDeleteLeaveType, useGetLeaveType } from '../../hooks/leaveType/useLeaveType';
import { AddLeaveTypeModal, EditLeaveTypeModal } from './LeaveTypeModal/LeaveTypeModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';


const LeaveType = () => {
	const { data: leaveTypeData, isLoading } = useGetLeaveType();

	const [existingLeaveTypes, setExistingLeaveTypes] = useState([]);

	const [openAddModal, setOpenAddModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const [editedLeaveType, setEditedLeaveType] = useState({});
	const [deletedLeaveType, setDeletedLeaveType] = useState({});

	const handleAddOpenModal = () => setOpenAddModal(true);
	const handleCloseAddModal = () => setOpenAddModal(false);

	const handleCloseEditModal = () => setOpenEditModal(false);
	const handleCloseDeleteModal = () => setOpenDeleteModal(false);

	const deleteLeaveTypeMutation = useDeleteLeaveType({});
	const handleDeleteLeaveType = (rowData) => {
		setDeletedLeaveType(rowData);
		setOpenDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		deleteLeaveTypeMutation.mutate(deletedLeaveType.id);
		setOpenDeleteModal(false);
	};

	const handleEditLeaveType = (rowData) => {
		setEditedLeaveType(rowData);
		setOpenEditModal(true);
	};

	useEffect(() => {
		if (leaveTypeData) {
			const leaveNames = leaveTypeData.map((leaveType) => leaveType.leaveName);
			setExistingLeaveTypes(leaveNames);
		}
	}, [leaveTypeData]);

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
			render: (rowData) => {
				const formattedLeaveName = rowData.leaveName.charAt(0).toUpperCase() + rowData.leaveName.slice(1).toLowerCase();
				return `${formattedLeaveName} Leave`;
			  },
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
					<Button color="primary" onClick={() => handleDeleteLeaveType(rowData)}>
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
					pageSize: 10,
					emptyRowsWhenPaging: false,
					headerStyle: {
						backgroundColor: '#01579b',
						color: '#FFF',
						fontSize: "1rem",
						padding: 'dense',
						height: 50,
					},
					rowStyle: {
						fontSize: ".8rem",
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
					existingLeaveTypes={existingLeaveTypes}
				/>
			)}
			{openDeleteModal && (
				<DeleteConfirmationModal
					open={openDeleteModal}
					handleCloseModal={handleCloseDeleteModal}
					handleConfirmDelete={handleConfirmDelete}
					message={"Leave Type"}
				/>
			)}
		</>
	);
};

export default LeaveType;
