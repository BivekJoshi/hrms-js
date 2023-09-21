import { useFormik } from 'formik';
import { useAddEmployeeHistory, useEditEmployeeHistory } from '../useEmployeeHistory';

const useEmployeeHistoryForm = ({ data, isLoadingHistory: isLoading }) => {
    const { mutate: addMutate } = useAddEmployeeHistory({});
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
        onSubmit: (values) => {
            if (values.history.some((history)=>!history.id)) {
                handleRequest(values);
            } else {
                handleEditRequest(values);
            }
        },
    });

    const handleRequest = (values) => {
        values = { ...values };
        addMutate(values, formik);
    }

    const handleEditRequest = (values) => {
        values = { ...values };
        editMutate(values, formik);
    }
    return { formik };
}

export default useEmployeeHistoryForm;