import { useFormik } from "formik";
import { usePathAddConfig } from "./usePathConfig";
import { PathConfigSchema } from "./PathConfigSchema";

const usePathConfigForm = (configData) => {
  const { mutate: pathConfig } = usePathAddConfig({});

  const formik = useFormik({
    initialValues: {
      applicationUrl: configData?.applicationUrl || "",
      documentUrl: configData?.documentUrl || "",
    },
    validationSchema: PathConfigSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    const value = { ...values };
    pathConfig(value, {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };

  return { formik };
};

export default usePathConfigForm;
