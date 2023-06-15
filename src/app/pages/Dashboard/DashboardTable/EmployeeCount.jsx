import React from 'react'
import { useGetDashboard } from '../../../hooks/dashboard/useDashboard';
import MaterialTable from '@material-table/core';

const columns = [
    {
        title: "All Employees",
        field: "allEmployees",
        emptyValue: "-",
        width: 300,
    },
    {
        title: "New Employees",
        field: "newEmployees",
        emptyValue: "-",
        width: 340,
    },
    {
        title: "Male Employees",
        field: "maleEmployees",
        emptyValue: "-",
    },
    {
        title: "Female Employees",
        field: "femaleEmployees",
        emptyValue: "-",
    },
]

const EmployeeCount = () => {
    const { data: dashboardData, isLoading } = useGetDashboard();
    console.log(dashboardData)
    if (isLoading) return <>Loading</>;

    return (
        <p>jhkj</p>
    )
}

export default EmployeeCount