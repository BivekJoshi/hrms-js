import { Box, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { useGetEmployeeData } from "../../../../hooks/employee/useEmployee";

const EmployeeGridView = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const { data: employeeData, isLoading } = useGetEmployeeData(1, 10);

  const handlePageChange=()=>{
    console.log("Cliced");
  }
  if (isLoading)
    return (
      <>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </>
    );
  return (
    <>
      <Grid
        container
        item
        gap={1}
        className="project-card-control"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
          gap: "1rem",
        }}
      >
        {employeeData?.employees?.map((employee, index) => (
          <EmployeeCard
            key={index}
            IsActive={employee?.isActive || ""}
            EmployeeId={employee?.id || ""}
            EFirstName={employee?.firstName || ""}
            EMiddleName={employee?.middleName || ""}
            ELastName={employee?.lastName || ""}
            OfficeEmail={employee?.officeEmail || ""}
            MobileNumber={employee?.mobileNumber || ""}
            PositionName={employee?.positionName || ""}
            PositionLevel={employee?.position?.positionLevel || ""}
            EGender={employee?.gender || ""}
            // EmployeeData={employeeData}
            ProgressBarRes={employee?.progressBarRes || ""}
            employeePhoto={employee?.employeePhotoPath}
          />
        ))}
      </Grid>

      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <Pagination
          count={employeeData?.totalPages}
          // page={employeeData}
          onChange={handlePageChange}
          boundaryCount={3}
          size='large'
          color='primary'
        />
      </Box>
    </>
  );
};

export default EmployeeGridView;
