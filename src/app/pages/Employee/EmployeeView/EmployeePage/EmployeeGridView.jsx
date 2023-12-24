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

const EmployeeGridView = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState("");
  const { data: employeeData, isLoading: loading } = useGetEmployeeData(
    pageNumber,
    pageSize
  );

  const handlePageChange = (event, newPage) => {
    const adjustedPageNumber = newPage - 1;
    setPageNumber(adjustedPageNumber);
  };
  const handlePageSizeChange = (event, newValue) => {
    const newPageSize = parseInt(newValue, 10) || 12;
    setPageSize(newPageSize);
    setPageNumber(0);
  };

  useEffect(() => {}, [pageNumber, pageSize]);

  return !loading && (
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
            PositionName={employee?.position?.positionName || ""}
            PositionLevel={employee?.position?.positionLevel || ""}
            EGender={employee?.gender || ""}
            ProgressBarRes={employee?.progressBarRes || ""}
            employeePhoto={employee?.employeePhotoPath}
          />
        ))}
      </Grid>

      <Box padding="2rem" display="grid" justifyContent={"end"}>
        <div style={{ display: "flex" }}>
          <Pagination
            count={employeeData?.totalPages}
            page={pageNumber + 1}
            onChange={handlePageChange}
            size="large"
            color="primary"
            showFirstButton
            showLastButton
          />
          <Autocomplete
            value={pageSize}
            onChange={handlePageSizeChange}
            options={[12, 24, 36]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="page"
                variant="outlined"
                size="small"
              />
            )}
          />
        </div>
      </Box>
    </>
  );
};

export default EmployeeGridView;
