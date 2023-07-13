import React, { useState } from "react";
import EmployeeGridView from "./EmployeePage/EmployeeGridView";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { Stack, TextField } from "@mui/material";

const EmployeeGrid = () => {
  const { data: employeeData } = useGetEmployee();
  const [nameFilter, setNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const filteredEmployees = employeeData?.filter(
    (employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      employee?.position?.positionName
        .toLowerCase()
        .includes(positionFilter.toLowerCase())
  );
  return (
    <>
      <Stack sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <TextField
          style={{ maxWidth: "200px" }}
          label="Filter by Position"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        />
        <TextField
          style={{ maxWidth: "200px" }}
          label="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Stack>
      <EmployeeGridView employeeData={filteredEmployees} />
    </>
  );
};

export default EmployeeGrid;
