import React from 'react';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import EmployeeGridView from './EmployeePage/EmployeeGridView';

const EmployeeGrid = () => {
    const { data: employeeData, isLoading } = useGetEmployee();

    return (
        <>
            <EmployeeGridView
                employeeData={employeeData}
                isLoading={isLoading}
            />
        </>
    );
};

export default EmployeeGrid;

