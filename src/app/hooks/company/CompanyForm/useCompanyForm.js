import { useFormik } from "formik";
import { useAddCompany, useEditCompany } from "../useCompany";
import { CompanySchema } from "../Validation/CompanySchema";

const useCompanyForm = (data) => {
  const { mutate: addCompany } = useAddCompany({});
  const { mutate: editCompany } = useEditCompany({});

  const formik = useFormik({
    initialValues: {
      companyName: data?.companyName || "",
      companyType: data?.companyType || "",
      companyDescription: data?.companyDescription || "",
      id: data?.id,
    },
    validationSchema: CompanySchema,
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
    addCompany(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editCompany(values, formik);
  };
  return { formik };
};

export default useCompanyForm;