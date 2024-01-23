import { useFormik } from 'formik';
import { useAddCompany, useEditCompany } from '../useCompany';
import { CompanySchema } from '../Validation/CompanySchema';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';

const useCompanyForm = (data, onClose) => {
  const { mutate: addCompany } = useAddCompany({});
  const { mutate: editCompany } = useEditCompany({});

  const formik = useFormik({
    initialValues: {
      branchName: data?.branchName || '',
      branchEmail: data?.branchEmail || '',
      branchContact: data?.branchContact || '',
      branchAddress: data?.branchAddress || '',
      branchDescription: data?.branchDescription || '',
      id: data?.id,
    },
    validationSchema: CompanySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addCompany(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  // const handledEditRequest = (values) => {
  //   values = { ...values };
  //   editCompany(values, {
  //     onSuccess: () => {
  //       onClose();
  //     },
  //   });
  // };

  const handledEditRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      editCompany(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };

  return { formik };
};

export default useCompanyForm;
