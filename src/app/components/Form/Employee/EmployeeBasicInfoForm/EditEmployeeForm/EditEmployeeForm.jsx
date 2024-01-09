import React from 'react';
import { useParams } from 'react-router';

import EmployeeAddressDetailForm from '../../EmployeeAddressDetailForm/EmployeeAddressDetailForm';
import EmployeeBankDetailForm from '../../EmployeeBankDetailForm/EmployeeBankDetailForm';
import EmployeeDocumentDetailForm from '../../EmployeeDocumentDetailForm/EmployeeDocumentDetailForm';
import EmployeeFamilyDetailForm from '../../EmployeeFamilyDetailForm/EmployeeFamilyDetailForm';
import EmployeeQualificationDetailForm from '../../EmployeeQualificationDetailForm/EmployeeQualificationDetailForm';
import EmployeeBasicInfoForm from '../EmployeeBasicInfoForm';
import EmployeeHistoryDetailForm from '../../EmployeeHistoryDetailForm/EmployeeHistoryDetailForm';

import useQualificationForm from '../../../../../hooks/employee/AddQualification/useQualificationForm';
import useFamilyForm from '../../../../../hooks/employee/AddFamily/useFamilyForm';
import useEditEmployeeForm from '../../../../../hooks/employee/EditEmployee/useEditEmployeeForm';
import { usePermanentAddressForm } from '../../../../../hooks/employee/AddAddress/useAddressForm';
import useAddBankForm from '../../../../../hooks/employee/AddBankForm/useAddBankForm';
import { useGetEmployeeById } from '../../../../../hooks/employee/useEmployee';
import useEmployeeHistoryForm from '../../../../../hooks/employee/AddEmployeeHistory/useEmployeeHistoryForm';
import { useAddDocumentForm } from '../../../../../hooks/employee/AddDocument/useAddDocumentForm';
import { useGetAddressById } from '../../../../../hooks/employee/useAddress';
import NewEmployeeFamilyDetailForm from '../../EmployeeFamilyDetailForm/NewEmployeeFamilyDetailForm';

const EditEmployeeForm = () => {
  const { id } = useParams();

  const steps = [
    'Basic Details',
    'Address Details',
    'Family Details',
    'Educational Details',
    'Bank Details',
    'Work History',
    'Document Details',
  ];

  const { data, isLoading: employeeLoading } = useGetEmployeeById(id);
  const { data: addressData, isLoading: getaddressLoading } =
    useGetAddressById(id);

  const { formik: qualificationFormik, isLoading: isLoadingQualification } =
    useQualificationForm();

  const { formik: familyFormik, isLoading: isLoadingFamily } = useFamilyForm();
  const { formik, isLoading } = useEditEmployeeForm({ data, employeeLoading });

  const { formik: permanentFormik, isLoading: addressLoading } =
    usePermanentAddressForm(addressData, getaddressLoading);

  const { formik: bankFormik } = useAddBankForm({ data, employeeLoading });

  const { formik: documentFormik } = useAddDocumentForm({
    data,
    employeeLoading,
  });

  const { formik: employeeHistoryFormik } = useEmployeeHistoryForm();

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
          <NewEmployeeFamilyDetailForm
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
        return <EmployeeBankDetailForm formik={bankFormik} />;

      case 5:
        return <EmployeeHistoryDetailForm formik={employeeHistoryFormik} />;

      case 6:
        return <EmployeeDocumentDetailForm formik={documentFormik} />;

      default:
        throw new Error('Unknown Step');
    }
  };

  const handleNext = ({ activeStep, setActiveStep }) => {
    const formikArray = [
      formik,
      // officeFormik,
      permanentFormik,
      familyFormik,
      qualificationFormik,
      bankFormik,
      employeeHistoryFormik,
      documentFormik,
    ];

    const currentFormik = formikArray[activeStep];

    currentFormik.setFieldTouched('');

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
