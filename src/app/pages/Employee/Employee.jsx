import React, { useState, useEffect, useRef } from 'react';
import { useGetEmployee } from '../../hooks/employee/useEmployee';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import EmployeeBasicInfoForm from '../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm';
import useAddEmployeeForm from '../../hooks/employee/AddEmployee/useAddEmployeeForm';
import { toast } from 'react-toastify';
import EmployeeCard from '../../components/cards/Employee/EmployeeCard';

const Employee = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: employeeData, isLoading } = useGetEmployee();
  const { formik } = useAddEmployeeForm();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #808080',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  if (isLoading) return <>Loading</>;
  return (
    <>
      {/* // <div>{employeeData[0].firstName}</div> */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          onClick={() => setOpenAddModal(true)}
          style={{ marginBottom: '20px' }}
        >
          Add Employee
        </Button>
      </Box>
      <Stack
        spacing={{ xs: 1, sm: 3 }}
        direction='row'
        useFlexGap
        flexWrap='wrap'
      >
        {employeeData?.employees?.map((employee, index) => (
          <Box key={index}>
            <EmployeeCard
              IsActive={employee.isActive}
              EmployeeId={employee.id}
              EFirstName={employee.firstName}
              EMiddleName={employee.middleName}
              ELastName={employee.lastName}
              OfficeEmail={employee?.officeEmail}
              MobileNumber={employee?.mobileNumber}
            />
          </Box>
        ))}
      </Stack>
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <Box sx={style}>
            <EmployeeBasicInfoForm formik={formik} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                style={{ marginTop: '10px' }}
                onClick={() => {
                  formik.handleSubmit();
                  setOpenAddModal(false);
                  formik.isValid
                    ? null
                    : toast.error(
                        'Please make sure you have filled the form correctly'
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
