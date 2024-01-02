import { useFormik } from "formik";
import { useAddDepartmentHistory } from '../../departmentHistory/useDepartmentHistory';
import { DepartmentHistorySchema } from '../Validation/departmentHistorySchema';

const useAddDepartmentHistoryForm = (onClose, id) => {
  const { mutate: addAssignHistory } = useAddDepartmentHistory({});

  const formik = useFormik({
    initialValues: {
      branchId: "",
      effectiveFromDate: "",
      effectiveToDate: "",
      remarks: "",
      employeeId: id,
      branchId: "",
    },
    validationSchema: DepartmentHistorySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
     
        handledAddRequest(values);
    
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addAssignHistory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};

export default useAddDepartmentHistoryForm;
