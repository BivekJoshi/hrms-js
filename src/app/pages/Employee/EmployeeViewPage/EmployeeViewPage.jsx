import React from 'react'
import { useGetEmployeeById } from '../../../hooks/employee/useEmployee';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import { useGetDocumentById } from '../../../hooks/employee/useDocument';

const EmployeeViewPage = () => {
    const { id } = useParams();
    const { data: employeeDataById, isLoading } = useGetEmployeeById(id);
    const { data: employeePhoto } = useGetDocumentById(id);

    if (isLoading) return <>Loading</>;

    return (
      <Overview data={employeeDataById} photo={employeePhoto}/>
    )
}

export default EmployeeViewPage;