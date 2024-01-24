import { useFormik } from "formik";
import { useEditUserControl } from "../../../../hooks/auth/userControl/useUserControl";
import { UserEditSchema } from "./userSchema/UserSchema";
import { isEqual } from "lodash";
import { toast } from "react-toastify";

// export const useEditUserControlForm = ({ rowData }) => {
//   const { mutate } = useEditUserControl({});

//   const formik = useFormik({
//     initialValues: {
//       userId: rowData?.id || "",
//       roleId: rowData?.role?.id || "",
//     },
//     // validationSchema: UserEditSchema,
//     onSubmit: (values) => {
//       handleRequest(values);
//     },
//   });

//   const handleRequest = (values) => {
//     values = { ...values };
//     if (!isEqual(values, formik.initialValues) && values?.roleId) {
//       mutate(values, {
//         onSuccess: () => {
//           formik.handleReset();
//         },
//       });
//     } else if (isEqual(values, formik.initialValues) || values?.roleId === null) {
//       toast.warning("No changes were made");
//     }
//   }; 

//   return { formik };
// };



// ... other imports

export const useEditUserControlForm = ({ rowData }) => {
  const { mutate } = useEditUserControl({});

  const formik = useFormik({
    initialValues: {
      userId: rowData?.id || "",
      roleId: rowData?.role?.id || "",
    },
    onSubmit: (values) => {
      handleRequest(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.roleId) {
        errors.roleId = "Please select a role";
      }
      return errors;
    },
  });

  const handleRequest = async (values) => {
    values = { ...values };
    const isValid = formik.isValid;

    if (isValid) {
      if (!isEqual(values, formik.initialValues) && values?.roleId) {
        mutate(values, {
          onSuccess: () => {
            formik.handleReset();
          },
        });
      } else if (isEqual(values, formik.initialValues) || values?.roleId === null) {
        toast.warning("No changes were made");
      }
    }
  };

  return { formik };
};
