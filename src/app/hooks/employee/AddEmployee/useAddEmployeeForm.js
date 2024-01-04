import { useAddEmployee } from '../useEmployee';
import { useFormik } from 'formik';
import { AddEmployeeSchema } from './addEmployeeSchema';

const useAddEmployeeForm = (handleOpenSubmitModal) => {
  const { mutate: addEmployee } = useAddEmployee();

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
    addEmployee(values, {
      onSuccess: () => {
        handleOpenSubmitModal();
        formik.resetForm();
      },
    });
  };
  return { formik };
};

export default useAddEmployeeForm;
