import { useFormik } from 'formik';
import { useTransferEmploymentHistory } from './useEmployeeHistory';

const useTransferEmployment = (data) => {
  const { mutate } = useTransferEmploymentHistory({});
  const activeData = data?.filter((item) => item?.isActive === true);
  const formik = useFormik({
    initialValues: {
      id: activeData?.id || '',
      positionId: '',
      fromBranch: activeData[0]?.branch?.id || '',
      fromDepartment: activeData[0]?.department?.id || '',
      fromPosition: activeData[0]?.position?.id || '',
      branchId: '',
      changePosition: false,
      departmentId: '',
      effectiveDateFrom: '',
      effectiveDateTo: '',
      remarks: '',
    },
    // validationSchema: EmploymentSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        formik.handleReset();
      },
    });
  };

  return { formik };
};
export default useTransferEmployment;
