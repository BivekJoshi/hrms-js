import React from "react";
import { useParams } from "react-router";

import EmployeeAddressDetailForm from "../../EmployeeAddressDetailForm/EmployeeAddressDetailForm";
import EmployeeBankDetailForm from "../../EmployeeBankDetailForm/EmployeeBankDetailForm";
import EmployeeDocumentDetailForm from "../../EmployeeDocumentDetailForm/EmployeeDocumentDetailForm";
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
import { useGetAddressById } from "../../../../../hooks/employee/useAddress";
import NewEmployeeFamilyDetailForm from "../../EmployeeFamilyDetailForm/NewEmployeeFamilyDetailForm";
import NewEmployeeHistoryDetailForm from "../../EmployeeHistoryDetailForm/NewEmployeeHistoryDetailForm";
import NewEmployeeQualificationDetailForm from "../../EmployeeQualificationDetailForm/NewEmployeeQualificationDetailForm";
import EmploymentDetails from "../../../../../pages/Employee/EmployeeViewPage/InfoTabs/EmploymentDetails/EmploymentDetails";
import AddEmploymentHistoryFields from "../../../EmploymentHistory/AddEmploymentHistoryFields";
import useEmploymentHistory from "../../../../../hooks/employee/useEmploymentHistory";
import {
  useGetEmployeeEmployment,
  useGetEmployeeHistory,
  useGetEmployeeHistoryById,
} from "../../../../../hooks/employee/useEmployeeHistory";
import EmploymentTransfer from "../../../../../pages/Employee/EmployeeViewPage/InfoTabs/EmploymentDetails/EmploymentTransfer";
import EditEmploymentTransfer from "../../../../../pages/Employee/EmployeeViewPage/InfoTabs/EmploymentDetails/EditEmployment/EditEmploymentTransfer";

const EditEmployeeForm = () => {
  const { id } = useParams();

  const steps = [
    "Basic Details",
    "Address Details",
    "Employment Details",
    "Family Details",
    "Educational Details",
    "Bank Details",
    "Work History",
    "Document Details",
  ];

  const { data, isLoading: employeeLoading } = useGetEmployeeById(id);
  // const { data: addressData, isLoading: getaddressLoading } = useGetAddressById(
  //   id
  // );
  const {
    data: employmentHistoryData,
    isLoading: LoadingEmployment,
  } = useGetEmployeeEmployment(id);

  const minDate = employmentHistoryData?.[0]?.effectiveDateFrom;
  const {
    formik: qualificationFormik,
    isLoading: isLoadingQualification,
  } = useQualificationForm();

  const { formik: familyFormik, isLoading: isLoadingFamily } = useFamilyForm();
  const { formik, isLoading } = useEditEmployeeForm({ data, employeeLoading });

  const {
    formik: permanentFormik,
    isLoading: addressLoading,
  } = usePermanentAddressForm(id);

  const { formik: employmentHistoryFormik } = useEmploymentHistory();

  const { formik: bankFormik } = useAddBankForm({ data, employeeLoading });

  const { formik: documentFormik } = useAddDocumentForm({
    data,
    employeeLoading,
  });

  const { formik: employeeHistoryFormik } = useEmployeeHistoryForm();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <EmployeeBasicInfoForm
            formik={formik}
            isLoading={isLoading}
            data={data}
          />
        );

      case 1:
        return <EmployeeAddressDetailForm formik={permanentFormik} />;

      case 2:
        return employmentHistoryData?.length > 0 ? (
          !LoadingEmployment && (
            // <EmploymentTransfer
            //   data={employmentHistoryData}
            //   // handleSuccess={handleSuccess}
            //   minDate={minDate}
            // />
            <EditEmploymentTransfer
              data={employmentHistoryData}
              isLoading={LoadingEmployment}
            />
          )
        ) : (
          <AddEmploymentHistoryFields
            formik={employmentHistoryFormik}
            adjustSize={6}
          />
        );
      case 3:
        return (
          <NewEmployeeFamilyDetailForm
            formik={familyFormik}
            isLoading={isLoadingFamily}
          />
        );

      case 4:
        return (
          <NewEmployeeQualificationDetailForm
            formik={qualificationFormik}
            isLoading={isLoadingQualification}
          />
        );

      case 5:
        return <EmployeeBankDetailForm formik={bankFormik} />;

      case 6:
        return <NewEmployeeHistoryDetailForm formik={employeeHistoryFormik} />;

      case 7:
        return <EmployeeDocumentDetailForm formik={documentFormik} />;

      default:
        throw new Error("Unknown Step");
    }
  };

  const handleNext = ({ activeStep, setActiveStep }) => {
    const formikArray = [
      formik,
      // officeFormik,
      permanentFormik,
      employmentHistoryFormik,
      familyFormik,
      qualificationFormik,
      bankFormik,
      employeeHistoryFormik,
      documentFormik,
    ];

    const currentFormik = formikArray[activeStep];

    currentFormik.setFieldTouched("");

    if (currentFormik.dirty) {
      currentFormik.handleSubmit();
    }

    if (currentFormik.isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return { getStepContent, handleNext, steps };
};

export default EditEmployeeForm;
