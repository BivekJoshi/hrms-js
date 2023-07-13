import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required(),
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
    taskStatus: Yup.string().required(),
    projectLeadId: Yup.number(),
    companyId: Yup.number().required(),
})

export {
    ProjectSchema
};