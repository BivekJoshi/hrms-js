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

const EmployeeGridView = ({ employeeData }) => {
  return (
    <>
      <Grid
        container
        item
        gap={1}
        className="project-card-control"
        sx={{
          display: "flex",
          // gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))',
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
            ProgressBarRes={employee?.progressBarRes || ""}
            employeePhoto={employee?.employeePhotoPath || ""}
          />
        ))}
      </Grid>
    </>
  );
};

export default EmployeeGridView;
