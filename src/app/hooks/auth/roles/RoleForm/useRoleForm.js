import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddRole, useEditRole } from "../../../../hooks/auth/roles/useRole";

const RoleSchema = Yup.object().shape({
  name: Yup.string().required("Role Name is required"),
});

export const useRoleForm = (data) => {
  // console.log(data);
  const { mutate: addRole } = useAddRole({});
  const { mutate: editRole } = useEditRole({});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      id: data?.id || "",
    },

    validationSchema: RoleSchema,
    enableReinitialize: "true",
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
    addRole(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editRole(values, formik);
  };

  return { formik };
};
