import * as React from 'react';
import MaterialTable from "material-table";
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
            sorting: false,
        },
        {
            title: 'Employee',
            field: 'firstName',
            render: (rowData) => `${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`,
            // width: "10%",
            sorting: false,
        },
        {
            title: 'Position',
            render: (rowData) => {
                const position = `${rowData?.position?.positionName ||'-'} (${rowData?.position?.positionLevel||'-'})`;
                return position ? position : '-';
            }
            ,
            width: 340,
            sorting: false,
        },
        {
            title: 'Email',
            field: 'officeEmail',
            emptyValue: '-',
            sorting: false,
        },
        {
            title: 'Contact No.',
            field: 'mobileNumber',
            emptyValue: '-',
            sorting: false,
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
            // width: 120,
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
                        fontSize: "1rem",
                        padding: 'dense',
                        height: 50,
                        textAlign:'center',
                        border:'2px solid #fff',
                        minHeight:'10px',
                        textTransform:'capitilize'
                    },
                    rowStyle: {
                        fontSize:".8rem",
                    },
                }}
            />
        </>
    )
}

export default EmployeeTableView