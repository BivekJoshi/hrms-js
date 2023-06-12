import * as React from 'react';

import MaterialTable from '@material-table/core';

import { useGetDesignation } from '../../hooks/designation/useDesignation';
import { Box, Button, Modal } from '@mui/material';
import DesignationForm from '../../components/Form/Designation/DesignationForm';

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

const Designation = () => {
	const { data: designationData, isLoading } = useGetDesignation();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	if (isLoading) return <>Loading</>;
	return (
		<>
			<div>
				<Button
					variant='contained'
					sx={{ mt: 3, ml: 1, backgroundColor: '#1c7ed6' }}
					onClick={handleOpen}
				>
					+Add Designation
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<DesignationForm onClose={handleClose} />
					</Box>
				</Modal>
				<br />
				<br />
			</div>

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
						title: 'Designation Name',
						field: 'positionName',
						emptyValue: '-',
						width: 300,
					},
					{
						title: 'Designation Level',
						field: 'positionLevel',
						emptyValue: '-',
						width: 340,
					},
					{
						title: 'Salary',
						field: 'salary',
						emptyValue: '-',
					},
					{
						title: 'Details',
						field: 'positionDetails',
						emptyValue: '-',
					},
				]}
				data={designationData}
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
export default Designation;
