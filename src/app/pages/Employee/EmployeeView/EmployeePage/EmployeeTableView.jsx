import * as React from 'react';
import MaterialTable from "material-table";
import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StartIcon from '@mui/icons-material/Start';
import { useNavigate } from 'react-router-dom';
import tableIcons from '../../../../../theme/overrides/TableIcon';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import useAuth from '../../../../../auth/hooks/component/login/useAuth';

const EmployeeTableView = ({ employeeData, isLoading }) => {
    const { isSuperAdmin, isAdmin, isHr } = useAuth();

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
            render: (rowData) => `${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`,
            // width: "10%",
        },
        {
            title: 'Position',
            render: (rowData) => {
                const position = `${rowData?.position?.positionName ||'-'} (${rowData?.position?.positionLevel||'-'})`;
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
        (isSuperAdmin || isAdmin || isHr) && {
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
    ].filter(Boolean);

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