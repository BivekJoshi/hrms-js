import { useFormik } from "formik";
import { DepartmentSchema } from "../Validation/DepartmentSchema";
import { useAddDepartment, useEditDepartment } from "../useDepartment";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

const useDepartmentForm = (data, onClose) => {
  const { mutate: addDepartment } = useAddDepartment({});
  const { mutate: editDepartment } = useEditDepartment({});

  const formik = useFormik({
    initialValues: {
      departmentName: data?.departmentName || "",
      departmentType: data?.departmentType || "",
      departmentDescription: data?.departmentDescription || "",
      id: data?.id || "",
    },
    validationSchema: DepartmentSchema,
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
    addDepartment(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  // const handledEditRequest = (values) => {
  //   values = { ...values };
  //   editDepartment(values, {
  //     onSuccess:()=>{
  //       onClose();
  //     }
  //   });
  // };

  const handledEditRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      editDepartment(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };

  return { formik };
};

export default useDepartmentForm;
