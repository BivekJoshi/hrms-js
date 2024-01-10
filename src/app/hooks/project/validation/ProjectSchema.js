import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string()
    .required("Please enter project name")
    .max(50, "Project name cannot exceed 50 characters"),
  startDate: Yup.string().required("Project start date is required"),
  taskStatus: Yup.string().required("Please select task status"),
  projectLeadId: Yup.string().required("Please select leader for project"),
  // companyId: Yup.number().required("Please Select Company"),
});

export { ProjectSchema };
