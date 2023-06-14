import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EmployeeBasicInfoForm from '../EmployeeBasicInfoForm';
import useEditEmployeeForm from '../../../../../hooks/employee/EditEmployee/useEditEmployeeForm';
import EmployeeEducationDetailForm from '../../EmployeeEducationDetailForm/EmployeeEducationDetailForm';
import EmployeeAddressDetailForm from '../../EmployeeAddressDetailForm/EmployeeAddressDetailForm';
import {
  usePermanentAddressForm,
  useTemporaryAddressForm,
} from '../../../../../hooks/employee/AddAddress/useAddressForm';
import { useGetAddressById } from '../../../../../hooks/employee/useAddress';
import { useParams } from 'react-router';
import { useGetEmployeeById } from '../../../../../hooks/employee/useEmployee';
import EmployeeBankDetailForm from '../../EmployeeBankDetailForm/EmployeeBankDetailForm';
import useAddBankForm from '../../../../../hooks/employee/AddBankForm/useAddBankForm';

const steps = [
  'Basic Details',
  'Address Details',
  'Family Details',
  'Educational Details',
  'Bank Details',
  'Other Details',
];
const EditEmployeeForm = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  // const { data, isLoading: addressLoading } = useGetAddressById(id);
  const { data, isLoading: employeeLoading } = useGetEmployeeById(id);

  const { formik, isLoading } = useEditEmployeeForm({ data, employeeLoading });
  const { formik: permanentFormik } = usePermanentAddressForm({
    data,
    employeeLoading,
  });
  const { formik: temporaryFormik } = useTemporaryAddressForm();
  const { formik: bankFormik } = useAddBankForm();
  const handleNext = () => {
    switch (activeStep) {
      case 0:
        formik.setFieldTouched('');
        if (formik.dirty) {
          formik.handleSubmit();
        }

        break;
      case 1:
        permanentFormik.setFieldTouched('');
        if (permanentFormik.dirty) {
          permanentFormik.handleSubmit();
        } else if (temporaryFormik.dirty) {
          temporaryFormik.handleSubmit();
        }
        break;

      default:
        break;
    }
    setActiveStep(activeStep + 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EmployeeBasicInfoForm formik={formik} isLoading={isLoading} />;

      case 1:
        return (
          <EmployeeAddressDetailForm
            formik={permanentFormik}
            temporaryFormik={temporaryFormik}
          />
        );

      case 2:
        return <EmployeeEducationDetailForm />;

      // case 4:
        // return <EmployeeBankDetailForm formik={bankFormik} />;

      default:
        throw new Error('Unknown Step');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReturn = () => {
    setActiveStep(0);
  };

  return (
    <Container component='main' maxWidth='xlg' sx={{ mt: 5 }}>
      <Paper variant='plain' sx={{ my: { xs: 0, md: 6 }, p: { xs: 0, md: 3 } }}>
        <Typography component='h1' variant='h4' align='center'>
          Edit Employee
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant='h5' gutterBottom>
                Employee added successfully
              </Typography>
              <Typography variant='subtitle1'>SuccessFul.</Typography>
              <Button onClick={handleReturn} sx={{ mt: 3, ml: 1 }}>
                Return
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant='contained'
                    onClick={() => {
                      formik.handleSubmit();
                      formik.isValid
                        ? null
                        : toast.error(
                            'Please make sure you have filled the form correctly'
                          );
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Add Employee
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    onClick={() => {
                      handleNext();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
};

export default EditEmployeeForm;
