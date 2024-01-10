import {
  useAddEmployeeResource,
  useEditEmployeeResource,
} from '../useEmployeeResource';
import { useFormik } from 'formik';
import {
  EmployeeResourceEditSchema,
  EmployeeResourceSchema,
} from './EmployeeResourceSchema';

const useEmployeeResourceForm = (data, onClose) => {
  const { mutate: addEmployeeResource } = useAddEmployeeResource({});
  const { mutate: editEmployeeResource } = useEditEmployeeResource({});

  const formik = useFormik({
    initialValues: {
      officeResourceId: data?.officeResource?.id || '',
      officeResourceName: data?.officeResourceName || '',
      employeeId: data?.employee?.id || '',
      employeeName: data?.employeeName || '',
      receiveDate: data?.receiveDate || '',
      returnDate: data?.returnDate || '',
      conditionWhileProvided: data?.conditionWhileProvided || '',
      conditionWhileReturned: data?.conditionWhileReturned || '',
      remarks: data?.remarks || '',
      id: data?.id || '',
    },
    validationSchema: data
      ? EmployeeResourceEditSchema
      : EmployeeResourceSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });
  console.log('🚀 ~ useEmployeeResourceForm ~ formik:', formik);

  const handleRequest = (values) => {
    values = { ...values };
    addEmployeeResource(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEmployeeResource(values, {
      onSuccess: () => {
        onClose();
        // formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useEmployeeResourceForm;
