import * as Yup from "yup";

const ProjectEmployeeSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee name is required"),
    // projectId: Yup.string().required("Project name is required"),
    assignedOn: Yup.string().required("Assigned date is required"),
    // deAssignedOn: Yup.string(),
})

export {
    ProjectEmployeeSchema
};