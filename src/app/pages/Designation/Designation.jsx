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

const columns = [
	{
		title: "SN",
		render: (rowData) => rowData.tableData.id,
		cellStyle: {
			whiteSpace: 'nowrap',
		},
		width: 80,
	},
	{
		title: 'Designation Name',
		field: 'positionName',
		emptyValue: '-',
		width: 200,
	},
	{
		title: 'Designation Level',
		field: 'positionLevel',
		emptyValue: '-',
		width: 100,
	},
	{
		title: 'Salary',
		field: 'salary',
		emptyValue: '-',
		width: 200,
	},
	{
		title: 'Details',
		field: 'positionDetails',
		emptyValue: '-',
	},
]

const Designation = () => {
	const { data: designationData, isLoading } = useGetDesignation();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	if (isLoading) return <>Loading</>;
	return (
		<>
			<div>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleOpen}>+Add Designation</Button>
				</Box>
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
				columns={columns}
				data={designationData}
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
		</>
	);
};
export default Designation;
