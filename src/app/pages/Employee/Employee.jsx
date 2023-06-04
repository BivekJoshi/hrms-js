import React from 'react';
import { useGetEmployee } from '../../hooks/employee/useEmployee';

const Employee = () => {
  const { data: employeeData, isLoading } = useGetEmployee();
  if (isLoading) return <>Loading</>;
  return <div>{employeeData[0].firstName}</div>;
};

export default Employee;
