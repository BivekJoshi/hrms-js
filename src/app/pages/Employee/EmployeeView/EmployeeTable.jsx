import React, { useState } from 'react';


import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import EmployeeTableView from './EmployeePage/EmployeeTableView';

const EmployeeTable = () => {
    const { data: employeeData, isLoading } = useGetEmployee();

    return (
        <>
            <EmployeeTableView
                employeeData={employeeData}
                isLoading={isLoading}
                // handleEditCompany={handleEditCompany}
                // handleDeleteCompany={handleDeleteCompany}
            />
        </>
    );
};

export default EmployeeTable;

