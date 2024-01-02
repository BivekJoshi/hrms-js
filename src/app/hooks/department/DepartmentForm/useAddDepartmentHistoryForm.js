import { useFormik } from "formik";
import { useAddDepartmentHistory } from '../../departmentHistory/useDepartmentHistory';
import { DepartmentHistorySchema } from '../Validation/departmentHistorySchema';

const useAddDepartmentHistoryForm = (onClose, id) => {
  const { mutate: adddepartmentHistory } = useAddDepartmentHistory({});

  const formik = useFormik({
    initialValues: {
      departmentId: "",
      effectiveFromDate: "",
      effectiveToDate: "",
      remarks: "",
      employeeId: id,
    },
    // validationSchema: DepartmentHistorySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
     
        handledAddRequest(values);
    
    },
  });
console.log("for", formik)
  const handledAddRequest = (values) => {
    values = { ...values };
    adddepartmentHistory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};

export default useAddDepartmentHistoryForm;
