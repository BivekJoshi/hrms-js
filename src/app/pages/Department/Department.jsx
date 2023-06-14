import * as React from 'react';
import { useGetDepartment } from '../../hooks/department/useDepartment';

import MaterialTable from '@material-table/core';

import { Box, Button, Modal } from '@mui/material';
import DepartmentForm from '../../components/Form/Department/DepartmentForm';

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

const Department = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { data: departmentData, isLoading } = useGetDepartment();
	if (isLoading) return <>Loading</>;
	return (
		<>
			<div>
				<Button
					variant='contained'
					sx={{ backgroundColor: '#1c7ed6' }}
					onClick={handleOpen}
				>
					+Add Department
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<DepartmentForm onClose={handleClose} />
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
						title: 'Department Name',
						field: 'departmentName',
						emptyValue: '-',
						width: 300,
					},
					{
						title: 'Department Type',
						field: 'departmentType',
						emptyValue: '-',
						width: 340,
					},
					{
						title: 'Description',
						field: 'departmentDescription',
						emptyValue: '-',
					},
				]}
				data={departmentData}
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
export default Department;
