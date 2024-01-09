import { useFormik } from "formik";
import {
  useAddfamilyMember,
  useEditFamily,
} from "../../../../hooks/employee/useFamily";

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
    // validationSchema: PositionSchema,
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
