import { useFormik } from "formik";
import {
  useAddfamilyMember,
  useEditFamily,
} from "../../../../hooks/employee/useFamily";
import * as Yup from "yup";

const FamilySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  relation: Yup.string().required("Relation is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number format, must be 10 digits.")
    .matches(/^9[0-9]{9}$/, "Invalid mobile number format, must start with 9."),
});

const useAddFamilyDetails = () => {
  const { addEmployee: addEmployeemutate, isSuccess: isFormSubmitSuccess } =
    useAddfamilyMember({});
  const { editFamilyMutate, isSuccess: isEditSuccess } = useEditFamily({});

  const formik = useFormik({
    initialValues: {
      name: "",
      relation: "",
      mobileNumber: "",
    },
    validationSchema: FamilySchema,
    onSubmit: (values) => {
      if (values?.id) {
        editFamilyMutate(values, {
          onSuccess: () => {
            formik.handleReset();
          },
        });
      } else handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    addEmployeemutate(values, {
      onSuccess: () => {
        formik.handleReset();
      },
    });
  };

  return { formik, isFormSubmitSuccess, isEditSuccess };
};

export default useAddFamilyDetails;
