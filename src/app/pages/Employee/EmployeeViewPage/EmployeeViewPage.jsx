import React from 'react'
import { useGetEmployeeById } from '../../../hooks/employee/useEmployee';
import { useParams } from 'react-router-dom';
import Overview from './Overview';

const EmployeeViewPage = () => {
    const { id } = useParams();
    const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
    if (isLoading) return <>Loading</>;

    return (
      <Overview data={employeeDataById}/>
    )
}

export default EmployeeViewPage