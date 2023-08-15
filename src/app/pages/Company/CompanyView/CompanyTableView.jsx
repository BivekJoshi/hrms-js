import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../../../auth/hooks/component/login/useAuth';


const CompanyTableView = ({ companyData, isLoading, handleEditCompany, handleDeleteCompany }) => {
    const { isSuperAdmin, isAdmin, isHr } = useAuth();

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
            width: 180,
        },
        {
            title: 'Company Type',
            field: 'companyType',
            emptyValue: '-',
            width: 170,

        },
        {
            title: 'Description',
            field: 'companyDescription',
            emptyValue: '-',
            width: 400,

        },
       (isSuperAdmin || isAdmin || isHr) && {
            title: 'Actions',
            render: (rowData) => (
                <Stack direction="row" spacing={0}>
                        <Button
                            color="primary"
                            onClick={() => handleEditCompany(rowData)}
                        >
                            <EditIcon />
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => handleDeleteCompany(rowData)}
                        >
                            <DeleteIcon />
                        </Button>
                </Stack>
            ),
            sorting: false,
            width: 120,
        },
    ].filter(Boolean);

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
                        fontSize: "1rem",
                        padding: 'dense',
                        height: 50,
                        textAlign:'center',
                        border:'2px solid #fff',
                        minHeight:'10px',
                        textTransform:'capitilize'
                    },
                    rowStyle: {
                        fontSize: ".8rem",
                    },
                }}
            />
        </>
    )
}

export default CompanyTableView