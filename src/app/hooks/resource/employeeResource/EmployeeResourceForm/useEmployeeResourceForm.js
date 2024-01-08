import {
  useAddEmployeeResource,
  useEditEmployeeResource,
} from "../useEmployeeResource";
import { useFormik } from "formik";
import { EmployeeResourceSchema } from "./EmployeeResourceSchema";

const useEmployeeResourceForm = (data, onClose) => {
  const { mutate: addEmployeeResource } = useAddEmployeeResource({});
  const { mutate: editEmployeeResource } = useEditEmployeeResource({});

  const formik = useFormik({
    initialValues: {
      officeResourceId: data?.officeResource?.id || "",
      employeeId: data?.employee?.id || "",
      receiveDate: data?.receiveDate || "",
      returnDate: data?.returnDate || "",
      conditionWhileProvided: data?.conditionWhileProvided || "",
      conditionWhileReturned: data?.conditionWhileReturned || "",
      remarks: data?.remarks || "",
      id: data?.id || "",
    },
    // validationSchema: EmployeeResourceSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addEmployeeResource(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEmployeeResource(values, {
      onSuccess: () => {
        onClose();
        // formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useEmployeeResourceForm;
