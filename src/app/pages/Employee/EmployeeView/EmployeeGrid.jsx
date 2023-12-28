import React, { useContext, useState } from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import EmployeeGridView from "./EmployeePage/EmployeeGridView";
import {
  Box,
  Container,
  Stack,
  TextField,
  Grid,
  Card,
  Typography,
  Skeleton,
  Tooltip,
} from "@mui/material";
import ThemeModeContext from "../../../../theme/ThemeModeContext";

const EmployeeGrid = ({ employeeData, isLoading }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const { palette } = useContext(ThemeModeContext);

  const filteredEmployees = employeeData?.employees?.filter(
    (employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      employee?.positionName
        .toLowerCase()
        .includes(positionFilter.toLowerCase()) &&
      employee?.mobileNumber.toString().includes(phoneFilter)
  );
  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </>
    );
  }
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          padding: "16px",
          borderRadius: "6px",
          marginBottom: "16px",
          backgroundColor: palette?.background?.default,
        }}
      >
        <Typography variant="h7" mb={1} ontWeight={500}>
          Filter By:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {" "}
            <TextField
              label="Filter by Name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <TextField
              label="Filter by Position"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Filter by Phone Number"
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>

      <EmployeeGridView
        employeeData={filteredEmployees}
      />
    </>
  );
};

export default EmployeeGrid;
