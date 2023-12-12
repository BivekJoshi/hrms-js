import React from "react";
import { useGetEmployee } from "../../hooks/employee/useEmployee";
import { useGetProjectEmployee } from "../../hooks/project/projectEmployee/useProjectEmployee";

// export const EmailSorting = () => {
//   const { data : employeeProjectData } = useGetProjectEmployee();
//   const { data : employeeData } = useGetProjectEmployee();

//   if (employeeProjectData) {
//     const filteredProject = employeeProjectData.filter((project) => project?.id);

//   }
// }

export const getTechnicalEmployeeById = () => {
  const { data: employeeData } = useGetEmployee();

  if (employeeData) {
    const filteredEmployees = employeeData.filter(
      (employee) => employee?.shiftType === "TECHNICAL"
    );
    const technical = filteredEmployees.map((employee) => employee?.id);
    if (technical.length > 0) {
      return technical;
    } else {
      return "No employees found";
    }
  } else {
    return "No employee data found";
  }
};
export const getBusinessAEmployeeById = () => {
  const { data: employeeData } = useGetEmployee();

  if (employeeData) {
    const filteredEmployees = employeeData.filter(
      (employee) => employee?.shiftType === "BUSINESS_A"
    );
    const technical = filteredEmployees.map((employee) => employee?.id);
    if (technical.length > 0) {
      return technical;
    } else {
      return "No employees found";
    }
  } else {
    return "No employee data found";
  }
};
export const getBusinessBEmployeeById = () => {
  const { data: employeeData } = useGetEmployee();

  if (employeeData) {
    const filteredEmployees = employeeData.filter(
      (employee) => employee?.shiftType === "BUSINESS_B"
    );
    const technical = filteredEmployees.map((employee) => employee?.id);
    if (technical.length > 0) {
      return technical;
    } else {
      return "No employees found";
    }
  } else {
    return "No employee data found";
  }
};

export const getMaleEmployeeById = () => {
  const { data: employeeData } = useGetEmployee();

  if (employeeData) {
    const filteredEmployees = employeeData.filter(
      (employee) => employee?.gender === "MALE"
    );
    const emails = filteredEmployees.map((employee) => employee?.id);
    if (emails.length > 0) {
      return emails;
    } else {
      return "No employees with this gender found";
    }
  } else {
    return "No employee data found";
  }
};

export const getFemaleEmployeeById = () => {
  const { data: employeeData } = useGetEmployee();

  if (employeeData) {
    const filteredEmployees = employeeData.filter(
      (employee) => employee?.gender === "FEMALE"
    );
    const emails = filteredEmployees.map((employee) => employee?.id);
    if (emails.length > 0) {
      return emails;
    } else {
      return "No employees with this gender found";
    }
  } else {
    return "No employee data found";
  }
};

// export const getEmployeeByCompany = () => {
//   const { data: employeeData } = useGetEmployee();
//   if (employeeData) {
//     const filteredEmployees = employeeData.filter((employee) => employee);
//   }
// };
