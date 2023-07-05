import * as Yup from "yup";

const ProjectEmployeeSchema = Yup.object().shape({
    employeeId: Yup.string().required(),
    projectId: Yup.string().required(),
    assignedOn: Yup.string().required(),
    deAssignedOn: Yup.string(),
})

export {
    ProjectEmployeeSchema
};