import { useFormik } from 'formik';
import { useEditUserControl } from '../../../../hooks/auth/userControl/useUserControl';
import { UserSchema } from './userSchema/UserSchema';


export const useEditUserControlForm = ({rowData}) => {
    // console.log(rowData?.id);
    const { mutate } = useEditUserControl({});

    const formik = useFormik({
        initialValues: {
            userId: rowData?.id||"",
            roleId: "",
        },
        // validationSchema: UserSchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik, { onSuccess: () => formik.handleReset() });
    };

    return { formik };
};