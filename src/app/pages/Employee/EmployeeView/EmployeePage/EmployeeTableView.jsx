import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StartIcon from '@mui/icons-material/Start';
import { useNavigate } from 'react-router-dom';

const EmployeeTableView = ({ employeeData, isLoading }) => {
    const navigate = useNavigate();
     const position = employeeData[0]?.position?.positionName;
     console.log(position)
    const columns = [
        {
            title: 'SN',
            render: (rowData) => rowData.tableData.index + 1,
            width: 80,
            sortable: false,
        },
        {
            title: 'Employee',
            field: 'firstName',
            emptyValue: '-',
            width: 300,
        },
        {
            title: 'Position',
            render: (rowData) => {
                const position = rowData?.position?.positionName;
                return position ? position : '-';
            }
                ,
            width: 340,
        },
        {
            title: 'Email',
            field: 'officeEmail',
            emptyValue: '-',
        },
        {
            title: 'Contact No.',
            field: 'mobileNumber',
            emptyValue: '-',
        },
        {
            title: 'Actions',
            render: (rowData) => (
                <Stack direction="row" spacing={0}>
                    <Button color="primary" onClick={() => handleEditEmployee(rowData)}>
                        <EditIcon />
                    </Button>
                    <Button color="primary" onClick={() => handleViewEmployee(rowData)}>
                        <StartIcon />
                    </Button>
                </Stack>
            ),
            sorting: false,
            width: 120,
        },
    ];

    const handleEditEmployee = (rowData) => {
        navigate(`edit/${rowData.id}`);
    };

    const handleViewEmployee = (rowData) => {
        navigate(`${rowData.id}`);
    };

    return (
        <>
            <MaterialTable
                columns={columns}
                data={employeeData}
                title="Employees"
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
    )
}

export default EmployeeTableView