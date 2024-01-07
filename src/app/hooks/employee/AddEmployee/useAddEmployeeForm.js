import { useAddEmployee } from '../useEmployee';
import { useFormik } from 'formik';
import { AddEmployeeSchema } from './addEmployeeSchema';
import { useState } from 'react';

const useAddEmployeeForm = (handleOpenSubmitModal, handleOpenEmailModal) => {
  const { mutate: addEmployee } = useAddEmployee();
  const [ empId, setEmpId ] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      // dateOfJoin: "",
      mobileNumber: '',
      citizenshipNumber: '',
      panNumber: '',
      officeEmail: '',
      maritalStatus: '',
      remarks: '',
      // branchId: "",
      // positionId: "",
      // departmentId: "",
      // EmployeeBasicInfoForm: "",
      // shiftType:"",
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    setEmpId(null)
    addEmployee(values, {
      onSuccess: (data) => {
        setEmpId(data?.id)
        handleOpenSubmitModal();
        handleOpenEmailModal();
        formik.resetForm();
      },
    });
  };
  return { formik, empId };
};

export default useAddEmployeeForm;
