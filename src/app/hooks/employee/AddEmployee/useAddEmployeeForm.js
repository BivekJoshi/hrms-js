import { useAddEmployee } from "../useEmployee";
import { useFormik } from "formik";
import { AddEmployeeSchema } from "./addEmployeeSchema";

const useAddEmployeeForm = (onClose) => {
  const { mutate: addEmployee, data, isLoading } = useAddEmployee();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      dateOfJoin: "",
      mobileNumber: "",
      citizenshipNumber: "",
      panNumber: "",
      officeEmail: "",
      maritalStatus: "",
      branchId: "",
      positionId: "",
      departmentId: "",
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addEmployee(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };
  return { formik, data, isLoading };
};

export default useAddEmployeeForm;
