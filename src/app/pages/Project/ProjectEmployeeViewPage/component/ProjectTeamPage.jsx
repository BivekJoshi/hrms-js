import React from "react";
import EmployeeCard from "../../../../components/cards/Employee/EmployeeCard";
import { Box, Grid, Typography } from "@mui/material";

function ProjectTeamPage({
  projectWiseEmployeeData,
  employeeData,
  projectData,
}) {
  const getProjectName = (projectId) => {
    const project = projectData.find((project) => project.id === projectId);
    if (project) {
      return project.projectName;
    }
    return "Project Not Found";
  };

  return (
    <Box>
      {projectWiseEmployeeData ? (
        projectWiseEmployeeData.map((project, index) => (
          <Box key={index} sx={{ marginTop: "3rem" }}>
            <Typography variant='h4' style={{ padding: " 0 0 1rem 0 " }}>
              Project: {getProjectName(project?.projectId)}
            </Typography>
            <Box key={project?.projecctId}>
              <Grid
                container
                item
                gap={1}
                className="project-card-control"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                }}
              >
                {project?.employeeIds?.map((employeeId, index) => {
                  const employee = employeeData.find(
                    (emp) => emp.id === employeeId
                  );
                  if (employee) {
                    return (
                      <EmployeeCard
                        key={index}
                        EmployeeId={employee?.id || ""}
                        EFirstName={employee?.firstName || ""}
                        EMiddleName={employee?.middleName || ""}
                        ELastName={employee?.lastName || ""}
                        OfficeEmail={employee?.officeEmail || ""}
                        MobileNumber={employee?.mobileNumber || ""}
                        EGender={employee?.gender || ""}
                        PositionName={employee?.position?.positionName || ""}
                        PositionLevel={employee?.position?.positionLevel || ""}
                        employeePhoto={employee?.employeePhotoPath}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </Grid>
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
