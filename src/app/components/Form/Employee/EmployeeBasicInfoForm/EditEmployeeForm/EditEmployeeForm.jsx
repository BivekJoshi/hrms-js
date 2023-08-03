import React from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import EmployeeAddressDetailForm from "../../EmployeeAddressDetailForm/EmployeeAddressDetailForm";
import EmployeeBankDetailForm from "../../EmployeeBankDetailForm/EmployeeBankDetailForm";
import EmployeeDocumentDetailForm from "../../EmployeeDocumentDetailForm/EmployeeDocumentDetailForm";
import EmployeeFamilyDetailForm from "../../EmployeeFamilyDetailForm/EmployeeFamilyDetailForm";
import EmployeeQualificationDetailForm from "../../EmployeeQualificationDetailForm/EmployeeQualificationDetailForm";
import EmployeeBasicInfoForm from "../EmployeeBasicInfoForm";
import EmployeeHistoryDetailForm from "../../EmployeeHistoryDetailForm/EmployeeHistoryDetailForm";


import useQualificationForm from "../../../../../hooks/employee/AddQualification/useQualificationForm";
import useFamilyForm from "../../../../../hooks/employee/AddFamily/useFamilyForm";
import useEditEmployeeForm from "../../../../../hooks/employee/EditEmployee/useEditEmployeeForm";
import { usePermanentAddressForm } from "../../../../../hooks/employee/AddAddress/useAddressForm";
import useAddBankForm from "../../../../../hooks/employee/AddBankForm/useAddBankForm";
import { useGetEmployeeById } from "../../../../../hooks/employee/useEmployee";
import useEmployeeHistoryForm from "../../../../../hooks/employee/AddEmployeeHistory/useEmployeeHistoryForm";
import { useAddDocumentForm } from "../../../../../hooks/employee/AddDocument/useAddDocumentForm";


const EditEmployeeForm = () => {
  const { id } = useParams();

  const steps = [
    'Basic Details',
    'Address Details',
    'Family Details',
    'Educational Details',
    'Bank Details',
    'Employee History',
    'Document Details',
    'Other Details',
  ];

  const { data, isLoading: employeeLoading } = useGetEmployeeById(id);

  const { formik: qualificationFormik, isLoading: isLoadingQualification } = useQualificationForm({ data, employeeLoading });

  const { formik: familyFormik, isLoading: isLoadingFamily } = useFamilyForm({ data, employeeLoading, });

  const { formik, isLoading } = useEditEmployeeForm({ data, employeeLoading });

  const { formik: permanentFormik, isLoading: addressLoading } = usePermanentAddressForm({ data, employeeLoading });

  const { formik: bankFormik } = useAddBankForm({ data, employeeLoading });

  const { formik: documentFormik } = useAddDocumentForm({ data, employeeLoading, });

  const { formik: employeeHistoryFormik } = useEmployeeHistoryForm({ data, employeeLoading, });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <EmployeeBasicInfoForm
            formik={formik}
            isLoading={isLoading}
          />
        );

      case 1:
        return (
          <EmployeeAddressDetailForm
            formik={permanentFormik}
            isLoading={addressLoading}
          />
        );

      case 2:
        return (
          <EmployeeFamilyDetailForm
            formik={familyFormik}
            isLoading={isLoadingFamily}
          />
        );

      case 3:
        return (
          <EmployeeQualificationDetailForm
            formik={qualificationFormik}
            isLoading={isLoadingQualification}
          />
        );

      case 4:
        return (
          <EmployeeBankDetailForm
            formik={bankFormik}
          />
        );


      case 5:
        return (
          <EmployeeHistoryDetailForm
            formik={employeeHistoryFormik}
          />
        );

      case 6:
        return (
          <EmployeeDocumentDetailForm
            formik={documentFormik}
          />
        );

      case 7:
        return <p>Hello World</p>;

      case 8:
        return <p>Other Details</p>;

      default:
        throw new Error("Unknown Step");
    }
  }


  const handleNext = ({
    activeStep,
    setActiveStep
  }) => {
    switch (activeStep) {
      case 0:
        formik.setFieldTouched("");
        if (formik.dirty) {
          if (!formik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          formik.handleSubmit();
        }

        break;
      case 1:
        permanentFormik.setFieldTouched("");

        if (permanentFormik.dirty) {
          if (!permanentFormik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          permanentFormik.handleSubmit();
        }
        break;
      case 2:
        familyFormik.setFieldTouched("");
        if (familyFormik.dirty) {
          if (!familyFormik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          familyFormik.handleSubmit();
        }
        break;
      case 3:
        qualificationFormik.setFieldTouched("");
        if (qualificationFormik.dirty) {
          if (!qualificationFormik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          qualificationFormik.handleSubmit();
        }
        break;
      case 4:
        bankFormik.setFieldTouched("");
        if (bankFormik.dirty) {
          if (!bankFormik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          bankFormik.handleSubmit();
        }
        break;
      case 5:
        employeeHistoryFormik.setFieldTouched("");
        if (employeeHistoryFormik.dirty) {
          if (!employeeHistoryFormik.isValid) {
            toast.error("Please make sure you have filled the form correctly");
            return;
          }
          employeeHistoryFormik.handleSubmit();
        }
        break;

      case 6:
        documentFormik.setFieldTouched('');
        if (documentFormik.dirty) {
          documentFormik.handleSubmit();
        }

      default:
        break;
    }
    setActiveStep(activeStep + 1);
  };
  return { getStepContent, handleNext, steps }
};

export default EditEmployeeForm;