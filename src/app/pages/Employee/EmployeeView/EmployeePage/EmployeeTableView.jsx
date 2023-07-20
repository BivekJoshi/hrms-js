import * as React from 'react';
import MaterialTable from '@material-table/core';
import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StartIcon from '@mui/icons-material/Start';
import { useNavigate } from 'react-router-dom';
import tableIcons from '../../../../../theme/overrides/TableIcon';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const EmployeeTableView = ({ employeeData, isLoading }) => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'SN',
            render: (rowData) => rowData.tableData.id + 1,
            width: "3%",
            sortable: false,
        },
        {
            title: 'Employee',
            field: 'firstName',
            emptyValue: '-',
            width: "10%",
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
                        <RemoveRedEyeOutlinedIcon />
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
                icons={tableIcons}
                columns={columns}
                data={employeeData}
                title="Employees"
                isLoading={isLoading}
                options={{
                    toolbar: true,
                    exportButton: true,
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

export default EmployeeTableView