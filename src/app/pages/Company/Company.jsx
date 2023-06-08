import * as React from 'react';
import { useGetCompany } from '../../hooks/useCompany';
import MaterialTable from '@material-table/core';

const Company = () => {
  const { data: companyData, isLoading } = useGetCompany();
  if (isLoading) return <>Loading</>;
  return (
    <>
      {' '}
      <MaterialTable
        columns={columns}
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
