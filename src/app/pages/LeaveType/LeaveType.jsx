import * as React from 'react';

import { Box, Button, Modal } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useGetLeaveType } from '../../hooks/leaveType/useLeaveType';
import FormModal from '../../components/Modal/FormModal';
import LeaveTypeForm from '../../components/Form/LeaveType/LeaveTypeForm';


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
		field: 'carryForward',
		emptyValue: '-',
		width: 100,
		render: (rowData) => (rowData.carryForward ? 'Yes' : 'No'),
	},
	{
		title: 'Description',
		field: 'leaveDescription',
		emptyValue: '-',
	},
]

const LeaveType = () => {
	const { data: leaveTypeData, isLoading } = useGetLeaveType();

	const [openModal, setOpenModal] = React.useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	if (isLoading) return <>Loading</>;
	return (
		<>
			<div>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleOpenModal}>+Add Leave Type</Button>
				</Box>
			</div>
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
				onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
			/>
			<FormModal
				open={openModal}
				onClose={handleCloseModal}
				formComponent={<LeaveTypeForm onClose={handleCloseModal} />}
			/>
		</>
	);
};
export default LeaveType;
