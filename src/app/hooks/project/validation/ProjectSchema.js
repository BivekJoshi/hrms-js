import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required('Please Enter a Project Name'),
    startDate: Yup.string().required('Project Start Date is Required'),
    // endDate: Yup.string().required('Project End Date is Required'),
    taskStatus: Yup.string().required('Please Select Task Status'),
    projectLeadId: Yup.number().required('Please Select Leader For Project'),
    companyId: Yup.number().required('Please Select Company'),
})

export {
    ProjectSchema
};