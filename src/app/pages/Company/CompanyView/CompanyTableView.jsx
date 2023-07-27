import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const CompanyTableView = ({ companyData, isLoading, handleEditCompany, handleDeleteCompany }) => {

    const columns = [
        {
            title: 'SN',
            render: (rowData) => rowData.tableData.index + 1,
            width: 80,
            sortable: false,
        },
        {
            title: 'Company Name',
            field: 'companyName',
            emptyValue: '-',
            width: 80,
        },
        {
            title: 'Company Type',
            field: 'companyType',
            emptyValue: '-',
            width: 200,
        },
        {
            title: 'Description',
            field: 'companyDescription',
            emptyValue: '-',
        },
        {
            title: 'Actions',
            render: (rowData) => (
                <Stack direction="row" spacing={0}>
                    <Button color="primary" onClick={() => handleEditCompany(rowData)}>
                        <EditIcon />
                    </Button>
                    <Button color="primary" onClick={() => handleDeleteCompany(rowData)}>
                        <DeleteIcon />
                    </Button>
                </Stack>
            ),
            sorting: false,
            width: 120,
        },
    ];

    return (
        <>
            <MaterialTable
                columns={columns}
                data={companyData}
                title="Company List"
                isLoading={isLoading}
                options={{
                    padding: 'dense',
                    margin: 50,
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    headerStyle: {
                        backgroundColor: '#01579b',
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
    )
}

export default CompanyTableView