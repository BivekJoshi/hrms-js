import { useFormik } from 'formik';
import { useAddEmployeeHistory, useEditEmployeeHistory } from '../useEmployeeHistory';
import HistorySchema from './HistorySchema';


const useEmployeeHistoryForm = ({ data, isLoadingHistory: isLoading }) => {
    const { mutate } = useAddEmployeeHistory({});
    const { mutate: editMutate } = useEditEmployeeHistory({});

    const historyDetails =
        !isLoading &&
        data?.employmentHistories.map((empHistory) => ({
            id: empHistory?.id || '',
            employerName: empHistory?.employerName || '',
            employerAddress: empHistory?.employerAddress || '',
            pastPosition: empHistory?.pastPosition || '',
            fromDate: empHistory?.fromDate || '',
            toDate: empHistory?.toDate || '',
            description: empHistory?.description || '',
            remarks: empHistory?.remarks || '',
        }));
    const formik = useFormik({
        initialValues: {
            history: historyDetails &&
                historyDetails.length > 0 ?
                historyDetails :
                [
                    {
                        employerName: '',
                        employerAddress: '',
                        pastPosition: '',
                        fromDate: '',
                        toDate: '',
                        description: '',
                        remarks: '',
                    }
                ],
        },
        enableReinitialize: "true",
        // validationSchema: HistorySchema,
        onSubmit: (values) => {
            if (historyDetails.length > 0) {
                handleEditRequest(values);
            } else {
                handleRequest(values);
            }
        },
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    }

    const handleEditRequest = (values) => {
        values = { ...values };
        editMutate(values, formik);
    }
    return { formik };
}

export default useEmployeeHistoryForm