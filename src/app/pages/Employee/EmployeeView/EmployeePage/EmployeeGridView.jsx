import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { useGetEmployeeData } from "../../../../hooks/employee/useEmployee";

const EmployeeGridView = ({ employeeData, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = 12;
  const { data: employeePageData } = useGetEmployeeData(pageNumber);

  const pageSize = employeePageData?.pageSize || 10;
  const totalPages = employeePageData?.totalPages || 0;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {employeeData?.slice(startIndex, endIndex).map((employee, index) => (
          <EmployeeCard
            key={index}
            IsActive={employee?.isActive || ""}
            EmployeeId={employee?.id || ""}
            EFirstName={employee?.firstName || ""}
            EMiddleName={employee?.middleName || ""}
            ELastName={employee?.lastName || ""}
            OfficeEmail={employee?.officeEmail || ""}
            MobileNumber={employee?.mobileNumber || ""}
            PositionName={employee?.position?.positionName || ""}
            PositionLevel={employee?.position?.positionLevel || ""}
            EGender={employee?.gender || ""}
            EmployeeData={employeeData}
            ProgressBarRes={employee?.progressBarRes || ""}
            employeePhoto={employee?.employeePhotoPath}
          />
        ))}
      </Grid>

      <Box padding="2rem" display="grid" justifyContent={"center"}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          boundaryCount={3}
          size="large"
          color="primary"
        />
      </Box>
    </>
  );
};

export default EmployeeGridView;
