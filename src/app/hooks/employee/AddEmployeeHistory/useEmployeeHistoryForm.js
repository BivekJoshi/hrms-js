import { useFormik } from 'formik';
import {
  useAddEmployeeHistory,
  useEditEmployeeHistory,
  useGetEmployeeHistory,
} from '../useEmployeeHistory';
import { useParams } from 'react-router-dom';
import HistorySchema from './HistorySchema';

const useEmployeeHistoryForm = () => {
  const { id } = useParams();
  const { mutate: addMutate } = useAddEmployeeHistory({});
  const { mutate: editMutate } = useEditEmployeeHistory({});
  const { data: empHistoryData, isLoading: empHistoryLoading } =
    useGetEmployeeHistory(id);
  const historyDetails =
    !empHistoryLoading &&
    empHistoryData?.map((empHistory) => ({
      id: empHistory?.id || '',
      employerName: empHistory?.employerName || '',
      employerAddress: empHistory?.employerAddress || '',
      pastPosition: empHistory?.pastPosition || '',
      fromDate: empHistory?.fromDate || '',
      toDate: empHistory?.toDate || '',
      description: empHistory?.description || '',
      experiencePath: empHistory?.experiencePath || '',
      // remarks: empHistory?.remarks || '',
    }));

  const formik = useFormik({
    initialValues: {
      history:
        historyDetails.length > 0
          ? historyDetails
          : [
              {
                employerName: '',
                employerAddress: '',
                pastPosition: '',
                fromDate: '',
                toDate: '',
                description: '',
                // remarks: '',
              },
            ],
    },
    validationSchema: HistorySchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      if (values.history.some((history) => !history.id)) {
        handleRequest(values);
      } else {
        handleEditRequest(values);
      }
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    addMutate(values, formik);
  };

  const handleEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };

  return { formik };
};

export default useEmployeeHistoryForm;
