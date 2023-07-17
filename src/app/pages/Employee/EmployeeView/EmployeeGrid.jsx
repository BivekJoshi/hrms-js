import React, { useState } from "react";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import EmployeeGridView from "./EmployeePage/EmployeeGridView";
import { Box, Container, Stack, TextField, Grid, Card, Typography } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const EmployeeGrid = () => {
  const { data: employeeData } = useGetEmployee();
  const [nameFilter, setNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const filteredEmployees = employeeData?.filter(
    (employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      employee?.position?.positionName
        .toLowerCase()
        .includes(positionFilter.toLowerCase()) &&
      employee?.mobileNumber.toString().includes(phoneFilter)
  );

  const handleFilterIconClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  return (
    <>
      <Stack sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <FilterAltOutlinedIcon onClick={handleFilterIconClick} style={{ fontSize: '32px' }} />
        {isContainerVisible && (
          <Container maxWidth="100vh">
            <Card sx={{ padding: 1 }} >
              <Typography variant="h6" gutterBottom>
                Search Employee
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    label="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    label="Filter by Position"
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    label="Filter by Phone Number"
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Card>
          </Container>
        )}
      </Stack>
      <br />
      <EmployeeGridView employeeData={filteredEmployees} />
    </>
  );
};

export default EmployeeGrid;
