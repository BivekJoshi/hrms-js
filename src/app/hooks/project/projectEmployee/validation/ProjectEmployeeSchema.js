import * as Yup from "yup";

const ProjectEmployeeSchema = Yup.object().shape({
    employeeId: Yup.string().required("Please select employee name "),
    // projectId: Yup.string().required("Project name is required"),
    assignedOn: Yup.string().required("Please select assigned date"),
    // deAssignedOn: Yup.string(),
})

export {
    ProjectEmployeeSchema
};