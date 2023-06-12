import * as React from 'react';

import { Box, Button, Modal } from '@mui/material';
import MaterialTable from '@material-table/core';
import { useGetLeaveType } from '../../hooks/leaveType/useLeaveType';
import LeaveForm from '../../components/Form/LeaveType/LeaveTypeForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const LeaveType = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { data: leaveTypeData, isLoading } = useGetLeaveType();
	if (isLoading) return <>Loading</>;
	return (
		<>
			<div>
				<Button
					variant='contained'
					sx={{ backgroundColor: '#1c7ed6' }}
					onClick={handleOpen}
				>
					+Add Leave Type
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<LeaveForm onClose={handleClose} />
					</Box>
				</Modal>
			</div>
			<br></br>
			<MaterialTable
				columns={[
					{
						title: 'SN',
						render: (rowData) => rowData.tableData.id,
						cellStyle: {
							whiteSpace: 'nowrap', // Prevents content from wrapping
						},
						width: 100,
					},
					{
						title: 'Leave Name',
						field: 'leaveName',
						emptyValue: '-',
						width: 300,
					},
					{
						title: 'Total Leave Days',
						field: 'leaveTotal',
						emptyValue: '-',
						width: 200,
					},
					{
						title: 'Carry Forward',
						field: 'carryForward',
						emptyValue: '-',
						width: 200,
						render: (rowData) => (rowData.carryForward ? 'Yes' : 'No'),
					},
					{
						title: 'Description',
						field: 'leaveDescription',
						emptyValue: '-',
					},
				]}
				data={leaveTypeData}
				title=''
				isLoading={isLoading}
				options={{
					padding: 'dense',
					margin: 50,
					pageSize: 12,
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
		</>
	);
};
export default LeaveType;
