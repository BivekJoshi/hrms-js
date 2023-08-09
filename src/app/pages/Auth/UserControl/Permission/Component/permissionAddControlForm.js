import { useFormik } from "formik";
import {
  useAddPermission,
  useEditPermission,
} from "../../../../../hooks/auth/permission/usePermission";
import * as Yup from "yup";

const permissioValidation = Yup.object().shape({
  name: Yup.string().required("Permission name is required"),
});

export const permissionAddControlForm = (data) => {
  const { mutate: addPermission } = useAddPermission({});
  const { mutate: editPermission } = useEditPermission({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      name: data?.name || "",
    },
    validationSchema: permissioValidation,
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
    addPermission(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editPermission(values, formik);
  };

  return { formik };
};