import { useAddEmployee } from '../useEmployee';
import { useFormik } from 'formik';
import { AddEmployeeSchema } from './addEmployeeSchema';

const useAddEmployeeForm = () => {
  const { mutate, data, isLoading } = useAddEmployee();

  // console.log('Úse Add Employee')
  // console.log(isLoading)
  // console.log(data);

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
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: (response) => console.log(response, 'from useaddemployee') });
  };
  return { formik, data, isLoading };
};

export default useAddEmployeeForm;