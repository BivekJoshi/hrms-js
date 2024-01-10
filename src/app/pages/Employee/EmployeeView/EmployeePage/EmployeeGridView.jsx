import { Grid } from "@mui/material";
import React from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";

const EmployeeGridView = ({ employeeData }) => {
  const sortedEmployees = employeeData?.employees?.slice().sort((a, b) => {
    const nameA = a?.firstName?.toLowerCase() || "";
    const nameB = b?.firstName?.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
  return (
    <>
      <Grid
        container
        item
        gap={1}
        className="project-card-control"
        sx={{
          display: `${employeeData?.employees?.length < 3 ? "flex" : "grid"}`,
          gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
          gap: "1rem",
        }}
      >
        {sortedEmployees?.map((employee, index) => (
          <EmployeeCard
            key={index}
            IsActive={employee?.isActive || ""}
            EmployeeId={employee?.id || ""}
            EFirstName={employee?.firstName || ""}
            EMiddleName={employee?.middleName || ""}
            ELastName={employee?.lastName || ""}
            OfficeEmail={employee?.officeEmail || ""}
            MobileNumber={employee?.mobileNumber || ""}
            PositionName={employee?.position?.name || ""}
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
