import * as Yup from "yup";

const UserSchema = Yup.object().shape({
    employeeId: Yup.string().required('Please select an employee'),
})

export {
    UserSchema
};