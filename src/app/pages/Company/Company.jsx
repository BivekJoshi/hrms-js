import * as React from 'react';
import MaterialTable from '@material-table/core';
import { useGetCompany } from '../../hooks/company/useCompany';
import { Box, Button, Modal } from '@mui/material';
import CompanyForm from '../../components/Form/Company/CompanyForm';

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

const Company = () => {
	const { data: companyData, isLoading } = useGetCompany();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	if (isLoading) return <>Loading</>;
	return (
		<>
			<Button
				variant='contained'
				sx={{ mt: 3, ml: 1, backgroundColor: '#1c7ed6' }}
				onClick={handleOpen}
			>
				+Add Company
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<CompanyForm onClose={handleClose} />
				</Box>
			</Modal>
			<br />
			<br />
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
						title: 'Company Name',
						field: 'companyName',
						emptyValue: '-',
						width: 300,
					},
					{
						title: 'Company Type',
						field: 'companyType',
						emptyValue: '-',
						width: 340,
					},
					{
						title: 'Description',
						field: 'companyDescription',
						emptyValue: '-',
					},
				]}
				data={companyData}
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
						// backgroundColor: '#EEE',
						fontSize: 18,
					},
				}}
				onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
			/>
		</>
	);
};
export default Company;
