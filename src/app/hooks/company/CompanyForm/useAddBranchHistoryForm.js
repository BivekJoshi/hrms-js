import { useFormik } from "formik";
import { BranchHistorySchema } from '../Validation/BranchHistorySchema';
import { useAddBranchHistory } from '../../branchHistory/useBranchHistory';

const useAddBranchHistoryForm = (onClose, id) => {
  const { mutate: addAssignHistory } = useAddBranchHistory({});

  const formik = useFormik({
    initialValues: {
      branchId: "",
      effectiveFromDate: "",
      effectiveToDate: "",
      remarks: "",
      employeeId: id,
    },
    validationSchema: BranchHistorySchema,
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

export default useAddBranchHistoryForm;
