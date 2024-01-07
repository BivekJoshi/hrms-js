import * as Yup from "yup";

const UserSchema = Yup.object().shape({
    employeeId: Yup.number().required('Please enter a employe id'),
})

export {
    UserSchema
};