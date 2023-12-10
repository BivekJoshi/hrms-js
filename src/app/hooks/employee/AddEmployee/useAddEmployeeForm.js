import { useAddEmployee } from '../useEmployee';
import { useFormik } from 'formik';
import { AddEmployeeSchema } from './addEmployeeSchema';

const useAddEmployeeForm = (handleOpenSubmitModal) => {
  const { mutate, data, isLoading } = useAddEmployee();


  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      dateOfJoin: '',
      mobileNumber: '',
      citizenshipNumber: '',
      panNumber: '',
      officeEmail: '',
      maritalStatus: '',
      companyId: '',
      positionId: '',
      departmentId: '',
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
      // handleOpenSubmitModal();
      formik.resetForm();
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik);
  };
  return { formik, data, isLoading };
};

export default useAddEmployeeForm;