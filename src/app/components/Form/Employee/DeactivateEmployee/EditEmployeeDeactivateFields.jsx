import { Grid, Button, TextField, Checkbox, MenuItem } from "@mui/material";
import React, { useState } from "react";
//import useAddProjectActiveForm from "../../../hooks/project/addProject/useAddProjectActiveForm";
import { pink } from "@mui/material/colors";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { toast } from "react-toastify";
import { useRemoveDeactiveEmployeeForm } from "../../../../hooks/employee/DeactivateEmploye/useRemoveDeactiveEmployeeForm";

export const EditEmployeeDeactivateFields = ({ onClose, isLoading, data }) => {
  const { formik } = useRemoveDeactiveEmployeeForm(data);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      formik.setTouched({
        employeeId: true,
        setActivation: true,
        effectiveDate: true,
      });
      onClose();
    } else {
      toast.error("please fill all the required fields");
    }
  };

  const options = [
    {
      value: "true",
      label: "Active Employee",
      id: 1,
    },
    {
      value: "False",
      label: "In Active Employee",
      id: 2,
    },
  ]

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="EmployeeId"
            name="EmployeeId"
            label="Employee Name"
            placeholder="Enter Employee Id"
            fullWidth
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
            helperText={formik.touched.employeeId && formik.errors.employeeId}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="setActivation"
            select
            name="setActivation"
            label="Employee Status"
            placeholder="Enter Employee staus"
            fullWidth
            value={formik.values.setActivation}
            onChange={formik.handleChange}
            error={formik.touched.setActivation && Boolean(formik.errors.setActivation)}
            helperText={formik.touched.setActivation && formik.errors.setActivation}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {
              options?.map((option)=> (
                <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
              ))
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="effectiveDate"
            name="effectiveDate"
            label="Employee Name"
            placeholder="Effective Date"
            type="date"
            fullWidth
            value={formik.values.effectiveDate}
            onChange={formik.handleChange}
            error={formik.touched.effectiveDate && Boolean(formik.errors.effectiveDate)}
            helperText={formik.touched.effectiveDate && formik.errors.effectiveDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="container"
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            De Activate Project
          </Button>
        </Grid>
      </Grid>
    )
  );
};

// export const EditEmployeeActivateFields = ({ onClose, isLoading, data }) => {
//   const { formik } = useAddActiveProject(data);
  
//   const handleFormSubmit = () => {
//     formik.handleSubmit();

//     if (formik.isValid) {
//       formik.setTouched({
//         projectId: true,
//       });
//       onClose();
//     } else {
//       toast.error("please fill all the required fields");
//     }
//   };

//   return (
//     !isLoading && (
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={12}>
//           <TextField
//             id="projectId"
//             name="projectId"
//             label="Project Name"
//             placeholder="Enter project Id"
//             fullWidth
//             value={formik.values.projectId}
//             onChange={formik.handleChange}
//             error={formik.touched.projectId && Boolean(formik.errors.projectId)}
//             helperText={formik.touched.projectId && formik.errors.projectId}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>

//         <Grid
//           container
//           direction="row"
//           justifyContent="flex-end"
//           alignItems="flex-end"
//         >
//           <Button
//             variant="container"
//             onClick={onClose}
//             sx={{ mt: 3, ml: 1 }}
//             color="error"
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleFormSubmit}
//             sx={{ mt: 3, ml: 1 }}
//           >
//             Activate Project
//           </Button>
//         </Grid>
//       </Grid>
//     )
//   );
// };