import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useGetList, useGetUserListById } from '../../hooks/todo/useTodo';


const Company = () => {
  const { data: TodoList, isLoading } = useGetList();

  const columns = [
   
    {
      title: 'List',
      field: 'message',
      emptyValue: '-',
      width: 300,
    },
 
    // {
    //   title: 'Actions',
    //   render: (rowData) => (
    //     <Stack direction="row" spacing={0}>
    //       <Button color="primary" onClick={() => handleEditCompany(rowData)}>
    //         <EditIcon />
    //       </Button>
    //       <Button color="primary" onClick={() => handleDeleteCompany(rowData)}>
    //         <DeleteIcon />
    //       </Button>
    //     </Stack>
    //   ),
    //   sorting: false,
    //   width: 120,
    // },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <MaterialTable
        columns={columns}
        data={TodoList}
        title=""
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
      />
    </>
  );
};

export default Company;