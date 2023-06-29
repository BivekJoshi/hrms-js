import { useAddEmployee } from '../useEmployee';
import { useFormik } from 'formik';
import { AddEmployeeSchema } from './addEmployeeSchema';

const useAddEmployeeForm = () => {
  const { mutate } = useAddEmployee({});

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
    console.log(values);
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => console.log(values) });
  };
  return { formik };
};

export default useAddEmployeeForm;