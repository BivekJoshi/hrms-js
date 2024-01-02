import { useFormik } from "formik";
import { OfficeEmployeeSchema } from './OfficeEmployeeSchema';
import { useAddOfficeEmployee, useEditOfficeEmployee } from '../useOfficeEmployee';

const useOfficeEmployeeForm = (data, isLoading) => {
  const { mutate: addOffice } = useAddOfficeEmployee({});
  const { mutate: editOffice } = useEditOfficeEmployee({});

  const formik = useFormik({
    initialValues: {
      dateOfJoin: data?.dateOfJoin || "",
      branchId: data?.branchId || "",
      positionId: data?.positionId || "",
      departmentId: data?.departmentId || "",
      shiftType: data?.shiftType || "",
      employmentType: data?.employmentType || "",
    },
    validationSchema: OfficeEmployeeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if(id) {
        handleAddRequest(values);
      } else {
        handleEditRequest(values);
      }      
    },
  });

  const handleAddRequest = (values) => {
    values = {
      ...values,
    };
    addOffice(values, formik);
  };

  const handleEditRequest = (values) => {
    values = {
      ...values,
    };
    editOffice(values, formik);
  };

  return { formik, isLoading };
};

export default useOfficeEmployeeForm;
