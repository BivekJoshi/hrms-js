import { useEditEmployee } from '../useEmployee';
import { EditEmployeeSchema } from './EditEmployeeSchema';
import { useFormik } from 'formik';

const useEditEmployeeForm = ({ data, isLoading }) => {
  const { mutate } = useEditEmployee({});

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || '',
      middleName: data?.middleName || '',
      lastName: data?.lastName || '',
      gender: data?.gender || '',
      dateOfBirth: data?.dateOfBirth || '',
      dateOfJoin: data?.dateOfJoin || '',
      mobileNumber: data?.mobileNumber || '',
      citizenshipNumber: data?.citizenshipNumber || '',
      panNumber: data?.panNumber || '',
      officeEmail: data?.officeEmail || '',
      maritalStatus: data?.maritalStatus || '',
      branchId: data?.branchId || '',
      positionId: data?.positionId || '',
      departmentId: data?.departmentId || '',
    },
    validationSchema: EditEmployeeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik);
  };

  return { formik, isLoading };
};

export default useEditEmployeeForm;
