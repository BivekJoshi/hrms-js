import { useFormik } from "formik";
import { useEditUserControl } from "../../../../hooks/auth/userControl/useUserControl";
import { UserEditSchema } from "./userSchema/UserSchema";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

export const useEditUserControlForm = ({ rowData }) => {
  const { mutate } = useEditUserControl({});

  const formik = useFormik({
    initialValues: {
      userId: rowData?.id || "",
      roleId: rowData?.role?.id || "",
    },
    // validationSchema: UserEditSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      mutate(values, {
        onSuccess: () => {
          formik.handleReset();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
    }
  };  

  return { formik };
};
