import * as React from 'react';
import MaterialTable from '@material-table/core';
import { useGetCompany } from '../../hooks/company/useCompany';

const Company = () => {

  const { data: companyData, isLoading } = useGetCompany();
  if (isLoading) return <>Loading</>;
  return (
    <>
      {' '}
      <MaterialTable
        columns={[
          {
            title: "Company Name",
            field: "companyName",
            emptyValue: "-",
          },
          {
            title: "Company Type",
            field: "companyType",
            emptyValue: "-",
          },{
            title: "Description",
            field: "companyDescription",
            emptyValue: "-",
          },
        ]}
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
