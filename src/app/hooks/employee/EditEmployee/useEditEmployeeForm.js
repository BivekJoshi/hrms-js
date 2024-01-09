import { useEditEmployee } from '../useEmployee';
import { EditEmployeeSchema } from './EditEmployeeSchema';
import { useFormik } from 'formik';

const useEditEmployeeForm = ({ data, isLoading }) => {
  const { mutate: editEmployee } = useEditEmployee();

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || '',
      middleName: data?.middleName || '',
      lastName: data?.lastName || '',
      gender: data?.gender || '',
      dateOfBirth: data?.dateOfBirth || '',
      // dateOfJoin: data?.dateOfJoin || "",
      mobileNumber: data?.mobileNumber || '',
      citizenshipNumber: data?.citizenshipNumber || '',
      panNumber: data?.panNumber || '',
      officeEmail: data?.officeEmail || '',
      maritalStatus: data?.maritalStatus || '',
      remarks: data?.remarks || '',
      // branchId: data?.branchId || "",
      // positionId: data?.positionId || "",
      // departmentId: data?.departmentId || "",
      // shiftType: data?.shiftType || "",
      // employmentType: data?.employmentType || "",
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
    editEmployee(values, {
      onSuccess: () => {
        // formik.resetForm();
      }
    });
  };

  return { formik, isLoading };
};

export default useEditEmployeeForm;
