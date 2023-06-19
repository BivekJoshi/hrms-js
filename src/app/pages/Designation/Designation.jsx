import * as React from 'react';

import MaterialTable from '@material-table/core';

import { useGetDesignation } from '../../hooks/designation/useDesignation';
import { Box, Button } from '@mui/material';
import DesignationForm from '../../components/Form/Designation/DesignationForm';
import FormModal from '../../components/Modal/FormModal';


const columns = [
	{
		title: 'SN',
		render: (rowData) => rowData.tableData.id + 1,
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

	const [openModal, setOpenModal] = React.useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	if (isLoading) return <>Loading</>;

	return (
		<>
			<div>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleOpenModal}>
						+Add Designation
					</Button>
				</Box>
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

			<FormModal
				open={openModal}
				onClose={handleCloseModal}
				formComponent={<DesignationForm onClose={handleCloseModal} />}
			/>
		</>
	);
};
export default Designation;
