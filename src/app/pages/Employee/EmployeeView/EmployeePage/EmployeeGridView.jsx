import { Grid,Box } from '@mui/material'
import React from 'react'
import EmployeeCard from '../../../../components/cards/Employee/EmployeeCard'
import { useGetEmployee } from '../../../../hooks/employee/useEmployee';

const EmployeeGridView = () => {
  const { data: employeeData, isLoading } = useGetEmployee();

  if (isLoading) return <>Loading</>;
  return (
    <Grid
        container
        item
        gap={3}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {employeeData?.map((employee, index) => (
          <Box key={index}>
            <EmployeeCard
              IsActive={employee.isActive}
              EmployeeId={employee.id}
              EFirstName={employee.firstName}
              EMiddleName={employee.middleName}
              ELastName={employee.lastName}
              OfficeEmail={employee?.officeEmail}
              MobileNumber={employee?.mobileNumber}
              Position={employee?.position?.positionName}
            />
          </Box>
        ))}
      </Grid>
  )
}

export default EmployeeGridView