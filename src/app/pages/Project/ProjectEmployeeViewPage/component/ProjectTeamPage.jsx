import React from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { Box, Grid } from "@mui/material";
import { useGetProjectEmployeeByLoggedInUser } from "../../../../hooks/project/projectEmployee/useProjectEmployee";

function ProjectTeamPage() {
  const { data: logInUserData } = useGetProjectEmployeeByLoggedInUser();
console.log(logInUserData);
  const employeeData = [
    {
      isActive: true,
      id: 1,
      firstName: "Sujana",
      lastName: "Amgain",
      officeEmail: "sujana@dghub.io",
      mobileNumber: "0987654321",
      gender: "Male",
    },
    {
      isActive: true,
      id: 1,
      firstName: "Sujana",
      lastName: "Amgain",
      officeEmail: "sujana@dghub.io",
      mobileNumber: "0987654321",
      gender: "Male",
    },
    {
      isActive: true,
      id: 1,
      firstName: "Sujana",
      lastName: "Amgain",
      officeEmail: "sujana@dghub.io",
      mobileNumber: "0987654321",
      gender: "Male",
    },
    {
      isActive: true,
      id: 1,
      firstName: "Sujana",
      lastName: "Amgain",
      officeEmail: "sujana@dghub.io",
      mobileNumber: "0987654321",
      gender: "Male",
    },
  ];
  return (
    <Box>
      {logInUserData ? (
        logInUserData.map((project, index) => (
          <Box key={index}>
            <h3 style={{ padding: " 0 0 1rem 0 " }}>{project.name}</h3>
            <Box>
              {project?.projectEmployees?.map((employ) => (
                <Box key={employ.empId}>
                  {employ.assignedOn}
                  <Grid
                    container
                    item
                    gap={1}
                    className="project-card-control"
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {/* {employeeData?.map((employee, index) => (
                    <EmployeeCard
                      key={index}
                      IsActive={employee?.isActive || ""}
                      EmployeeId={employee?.id || ""}
                      EFirstName={employee?.firstName || ""}
                      EMiddleName={employee?.middleName || ""}
                      ELastName={employee?.lastName || ""}
                      OfficeEmail={employee?.officeEmail || ""}
                      MobileNumber={employee?.mobileNumber || ""}
                      // PositionName={employee?.position?.positionName || ""}
                      // PositionLevel={employee?.position?.positionLevel || ""}
                      EGender={employee?.gender || ""}
                      // EmployeeData={employeeData}
                      // ProgressBarRes={employee?.progressBarRes || ""}
                      // employeePhoto={employee?.employeePhotoPath}
                    />
                  ))} */}
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <p>Loading or no data available</p>
      )}
    </Box>
  );
}

export default ProjectTeamPage;
