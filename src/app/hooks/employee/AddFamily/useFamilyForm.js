import { useFormik } from 'formik';
import { FamilySchema } from './FamilySchema';
import { useAddFamily } from '../useFamily';
import { useParams } from 'react-router-dom';

const useFamilyForm = () => {
    const { id } = useParams();
    const { mutate } = useAddFamily({});

    const formik = useFormik({
        initialValues: {
            family: [{ name: "", relation: "" }]
        },
        enableReinitialize: "true",
        validationSchema: FamilySchema,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        // console.log(values);
        values = {
            ...values,
        };
        mutate(values, formik, { onSuccess: () => console.log(values) });
    };
    return { formik }
};

export default useFamilyForm;
