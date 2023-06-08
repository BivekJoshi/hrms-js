import * as React from 'react';
// import { useGetCompany } from '../../hooks/useCompany';
import MaterialTable from '@material-table/core';
import { useGetCompany } from '../../hooks/company/useCompany';

const Company = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: companyData, isLoading } = useGetCompany();
  if (isLoading) return <>Loading</>;
  return (
    <>
      {' '}
      <MaterialTable
        columns={[]}
        data={companyData}
        title='Company'
        isLoading={isLoading}
        options={{
          padding: 'dense',
          pageSize: 10,
        }}
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />
    </>
  );
};
export default Company;
