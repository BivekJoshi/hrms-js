import {
  Autocomplete,
  Box,
  Grid,
  MenuItem,
  Pagination,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { useGetEmployeeData } from "../../../../hooks/employee/useEmployee";

const EmployeeGridView = ({employeeData}) => {
console.log(employeeData)
  // const [pageNumber, setPageNumber] = useState(0);
  // const [pageSize, setPageSize] = useState(12);
  // const { data: employeeData, isLoading } = useGetEmployeeData(
  //   pageNumber,
  //   pageSize
  // );

  // const handlePageChange = (event, newPage) => {
  //   setPageNumber(newPage - 1);
  // };

  // const handlePageSizeChange = (event, newValue) => {
  //   const newPageSize = parseInt(newValue, 10) || 0;
  //   setPageSize(newPageSize);
  //   setPageNumber(0);
  // };
   
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
        {employeeData?.map((employee, index) => (
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
            ProgressBarRes={employee?.progressBarRes || ""}
            employeePhoto={employee?.employeePhotoPath || ""}
          />
        ))}
      </Grid>

      {/* <Box mt={4} display="flex" justifyContent={"end"}>
        <Pagination
          count={employeeData?.totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          boundaryCount={3}
          size="large"
          color="primary"
        />
        <Autocomplete
          value={pageSize}
          onChange={handlePageSizeChange}
          options={[20, 30, 40, 50, 100]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="page"
              variant="outlined"
              size="small"
            />
          )}
        />
      </Box> */}
    </>
  );
};

export default EmployeeGridView;
