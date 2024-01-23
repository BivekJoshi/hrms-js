import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string()
    .required("Project Name is required ")
    .max(50, "Project Name cannot exceed 50 characters"),
  startDate: Yup.string().required("Please select start date"),
  taskStatus: Yup.string().required("Please select task status"),
  projectLeadId: Yup.string().required("Please select leader for project"),
  companyId: Yup.string().required("Please select project branch name"),
});

export { ProjectSchema };
