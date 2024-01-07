import * as Yup from "yup";

const UserSchema = Yup.object().shape({
    employeeId: Yup.number().required('Please select an employee'),
})

export {
    UserSchema
};