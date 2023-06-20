import * as Yup from "yup";

const addFormSchema = Yup.object().shape({
    message: Yup.string().required("Message is Required, can't Send Empty")
})

export { addFormSchema };