import React from "react";
import { useParams } from "react-router";

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
import { toast } from "react-toastify";
import { useGetBankByEmployeeId } from '../../../../../hooks/employee/useBank';
import { useGetEmployeeHistoryById } from '../../../../../hooks/employee/useEmployeeHistory';
import { useGetAddressById } from '../../../../../hooks/employee/useAddress';
import { useGetFammilyById } from '../../../../../hooks/employee/useFamily';

const EditEmployeeForm = () => {
  const { id } = useParams();

  const steps = [
    "Basic Details",
    "Address Details",
    "Family Details",
    "Educational Details",
    "Bank Details",
    "Employee History",
    "Document Details",
    // 'Other Details',
  ];

  const { data: employeeData, isLoading: employeeLoading } = useGetEmployeeById(id);
  const { data: bankData, isLoading: bankLoading } = useGetBankByEmployeeId(id);
  const { data: historyData, isLoading: historyLoading } = useGetEmployeeHistoryById(id);
  const { data: addressData, isLoading: addressLoading } = useGetAddressById(id);
  const { data: familyData, isLoading: familyLoading } = useGetFammilyById(id);
  
  const data = employeeData;
  console.log(data)

  // const { formik: qualificationFormik, isLoading: isLoadingQualification } =
  //   useQualificationForm({ data, employeeLoading });

  const { formik: familyFormik, isLoading: isLoadingFamily } = useFamilyForm({
    familyData,
    employeeLoading,
  });

  const { formik } = useEditEmployeeForm({ data, employeeLoading });

  const { formik: permanentFormik, isLoading } =  usePermanentAddressForm({ addressData, addressLoading });

  const { formik: bankFormik } = useAddBankForm({ bankData, bankLoading });

  // const { formik: documentFormik } = useAddDocumentForm({
  //   data,
  //   employeeLoading,
  // });

  // const { formik: employeeHistoryFormik } = useEmployeeHistoryForm({
  //   historyData,
  //   historyLoading,
  // });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EmployeeBasicInfoForm formik={formik} isLoading={isLoading} />;

      case 1:
        return (
          <EmployeeAddressDetailForm
            formik={permanentFormik}
            isLoading={addressLoading}
            data={addressData}
          />
        );

      case 2:
        return (
          <EmployeeFamilyDetailForm
            formik={familyFormik}
            isLoading={isLoadingFamily}
          />
        );

      // case 3:
      //   return (
      //     <EmployeeQualificationDetailForm
      //       formik={qualificationFormik}
      //       isLoading={isLoadingQualification}
      //     />
      //   );

      case 4:
        return <EmployeeBankDetailForm formik={bankFormik} />;

      // case 5:
      //   return <EmployeeHistoryDetailForm formik={employeeHistoryFormik} />;

      // case 6:
      //   return <EmployeeDocumentDetailForm formik={documentFormik} />;

      // case 7:
      //   return <p>Hello World</p>;

      // case 8:
      //   return <p>Other Details</p>;

      default:
        throw new Error("Unknown Step");
    }
  };

  const handleNext = ({ activeStep, setActiveStep }) => {
    switch (activeStep) {
      case 0:
        formik.setFieldTouched("");
        if (formik.dirty) {
          formik.handleSubmit();
        }
        if (formik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        permanentFormik.setFieldTouched("");
        if (permanentFormik.dirty) {
          permanentFormik.handleSubmit();
        }
        if (permanentFormik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 2:
        familyFormik.setFieldTouched('');

        if (familyFormik.dirty) {
          familyFormik.handleSubmit();
        }
        if (familyFormik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;

      case 3:
        qualificationFormik.setFieldTouched("");
        if (qualificationFormik.dirty) {
          qualificationFormik.handleSubmit();
        }
        if (qualificationFormik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 4:
        bankFormik.setFieldTouched("");
        if (bankFormik.dirty) {
          bankFormik.handleSubmit();
        }
        if (bankFormik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 5:
        employeeHistoryFormik.setFieldTouched("");
        if (employeeHistoryFormik.dirty) {
          employeeHistoryFormik.handleSubmit();
        }
        if (employeeHistoryFormik.isValid) {
          setActiveStep(activeStep + 1);
        }
        break;

      case 6:
        documentFormik.setFieldTouched("");
        if (documentFormik.dirty) {
          documentFormik.handleSubmit();
        }
      default:
        break;
    }
  };
  return { getStepContent, handleNext, steps };
};

export default EditEmployeeForm;
