import * as Yup from "yup";
import { useFormik } from "formik";
import { useEditPermissionRole } from "../../../../hooks/auth/roles/useRole";

const RolePermissionSchema = Yup.object().shape({
  name: Yup.string().required("Role Name is required"),
});

export const useRolePermissionForm = (data) => {
  // (data);
  const { mutate } = useEditPermissionRole({});

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      id: data?.id || "",
    },

    validationSchema: RolePermissionSchema,
    enableReinitialize: "true",
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  return { formik };
};
