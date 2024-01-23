import * as Yup from "yup";

const UserAddSchema = Yup.object().shape({
  // employeeId: Yup.string().required("Please select an employee"),
});

export { UserAddSchema };

const UserEditSchema = Yup.object().shape({
  roleId: Yup.string().required("Please select role"),
});

export { UserEditSchema };
