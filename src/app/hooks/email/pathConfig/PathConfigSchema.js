import * as Yup from "yup";

const PathConfigSchema = Yup.object().shape({
  documentUrl: Yup.string().required("Document URL is required"),
  applicationUrl: Yup.string().required("Application Url is required"),
});

export { PathConfigSchema };
