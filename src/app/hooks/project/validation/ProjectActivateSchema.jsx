import * as Yup from "yup";

const ProjectActivateSchema = Yup.object().shape({
    projectLeadId: Yup.number().required(),
})

export {
    ProjectActivateSchema
};