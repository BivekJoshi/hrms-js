import * as React from 'react';
import MaterialTable from '@material-table/core';
import { useGetCompany } from '../../hooks/company/useCompany';
import { Box, Button, Modal } from '@mui/material';
import CompanyForm from '../../components/Form/Company/CompanyForm';
import FormModal from '../../components/Modal/FormModal';


const columns=[
  {
    title: "SN",
    render: (rowData) => rowData.tableData.id,
    cellStyle: {
      whiteSpace: 'nowrap', // Prevents content from wrapping
    },
    width: 100,
  },
  {
    title: "Company Name",
    field: "companyName",
    emptyValue: "-",
    width: 300,
  },
  {
    title: "Company Type",
    field: "companyType",
    emptyValue: "-",
    width: 340,
  },
  {
    title: "Description",
    field: "companyDescription",
    emptyValue: "-",
  },
]

const Company = () => {
	const { data: companyData, isLoading } = useGetCompany();

	const [openModal, setOpenModal] = React.useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

  if (isLoading) return <>Loading</>;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleOpenModal}>+Add Company</Button>
      </Box>
      <br/><br/>
      <MaterialTable
        columns={columns}
        data={companyData}
        title=''
        isLoading={isLoading}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            fontSize: 20,
            padding: 'dense',
            height: 50,
          },
          rowStyle: {
            // backgroundColor: '#EEE',
            fontSize: 18,
          }
        }}
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />
      <FormModal
				open={openModal}
				onClose={handleCloseModal}
				formComponent={<CompanyForm onClose={handleCloseModal} />}
			/>
    </>
  );
};
export default Company;
