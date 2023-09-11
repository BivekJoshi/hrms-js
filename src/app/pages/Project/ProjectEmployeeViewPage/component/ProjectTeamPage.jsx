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
    <div>
      Hello
    </div>
  );
}

export default ProjectTeamPage;
