import * as Yup from "yup";

const UserSchema = Yup.object().shape({
    employeeId: Yup.number().required('Please Enter a Employe Id'),
})

export {
    UserSchema
};