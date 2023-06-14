import React, { useState } from 'react';
import { useGetEmployee } from '../../hooks/employee/useEmployee';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Email, LocalPhone } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import EmployeeBasicInfoForm from '../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm';
import useAddEmployeeForm from '../../hooks/employee/AddEmployee/useAddEmployeeForm';
import { toast } from 'react-toastify';

const Employee = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: employeeData, isLoading } = useGetEmployee();
  const { formik } = useAddEmployeeForm();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  
  if (isLoading) return <>Loading</>;
  return (
    <>
      {/* // <div>{employeeData[0].firstName}</div> */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          style={{ marginBottom: "20px" }}
        >
          Add Employee
        </Button>
      </Box>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {employeeData.map((employee) => (
          <Paper
            key={employee.id}
            sx={{
              p: 2,
              // margin: 'auto',
              maxWidth: 450,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              cursor: "pointer",
            }}
          >
            <Grid container spacing={2} key={employee.id}>
              <Grid item>
                <ButtonBase sx={{ width: 110, height: 150 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 66, height: 66 }}
                  />
                </ButtonBase>
                <Typography variant="body2" color="text.secondary">
                  ID: {employee.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {employee.firstName} {employee.middleName}{" "}
                      {employee.lastName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Chip label="Intern" style={{ width: 230 }} />
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                      <Stack spacing={3} direction="row">
                        <Email />
                        {employee?.officeEmail}
                      </Stack>
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                      <Stack spacing={3} direction="row">
                        <LocalPhone />
                        {employee?.mobileNumber}
                      </Stack>
                    </Typography>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-end">
                    <Stack spacing={2} direction="row">
                      <NavLink to={`edit/${employee.id}`}>
                        <Button variant="outlined">Edit</Button>
                      </NavLink>
                      <NavLink to={`${employee.id}`}>
                        <Button variant="contained">View Profile</Button>
                      </NavLink>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <EmployeeBasicInfoForm formik={formik} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  formik.handleSubmit();
                  formik.isValid
                    ? null
                    : toast.error(
                        "Please make sure you have filled the form correctly"
                      );
                }}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default Employee;
