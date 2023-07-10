import React from 'react';
import { useEditProject } from "../useProject";
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useGetEmployee } from '../../employee/useEmployee';
import { useGetCompany } from '../../company/useCompany';

const useEditProjectForm = (data) => {
    const { mutate } = useEditProject({});
    const { data: employeeData }  = useGetEmployee();
    const {data: companyData} = useGetCompany();
    // console.log({"companyData": companyData, "data": data})
   // employeeData?.find((emp) => console.log((emp.id == projectLeaderId)))
    const getProjectLeaderName = (projectLeaderId) => {
        return(           
            employeeData?.find((employee) => employee.id == projectLeaderId)
            ?.firstName || projectLeaderId
        )
    }

    const getCompanyName = (associateCompanies) => {
        return(   
            companyData?.find((company) => company.id == associateCompanies)
            ?.companyName || associateCompanies
        )
    }
    

    const formik = useFormik({
        initialValues: {
            projectName: data?.projectName || "",
            startDate: data?.startDate || "",
            endDate: data?.endDate || "",
            taskStatus: data?.taskStatus || "",
            // projectLeadId: getProjectLeaderName(data?.projectLeaderId) || "",
             projectLeadId: data?.projectLeaderId || "",
            // companyId: getCompanyName(data?.associateCompanies[0].id) || "",
             companyId: (data?.associateCompanies[0].id) || "",
            id: data?.id,
        },
        validationSchema: ProjectSchema,
        enableReinitialize: "true",

        onSubmit: (values) => {
            handleRequest(values);
        }
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };
    
    return { formik };

};

export default useEditProjectForm;