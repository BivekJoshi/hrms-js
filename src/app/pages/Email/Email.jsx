// import React, { useState } from "react";
// import { useSendEmail } from "../../hooks/email/useEmail";
// import { Button, Grid, TextField, Typography } from "@mui/material";

// function EmailForm({ employeeId, onClose, officeEmail }) {
//   const [emailData, setEmailData] = useState({
//     to: officeEmail || "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({
//     to: false,
//     message: false,
//   });

//   const { mutate } = useSendEmail({ employeeId });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEmailData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (validateForm()) {
//       mutate(emailData);
//       setEmailData({
//         to: "",
//         subject: "",
//         message: "",
//       });

//       setErrors({
//         to: false,
//         subject: false,
//       });
//       onClose();
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const updatedErrors = { ...errors };

//     if (emailData.to.trim() === "") {
//       updatedErrors.to = true;
//       isValid = false;
//     } else {
//       updatedErrors.to = false;
//     }

//     if (emailData.message.trim() === "") {
//       updatedErrors.message = true;
//       isValid = false;
//     } else {
//       updatedErrors.message = false;
//     }

//     setErrors(updatedErrors);
//     return isValid;
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={3}>
//         <br />
//         <Grid item xs={12}>
//         <TextField
//             fullWidth
//             required
//             label="To"
//             name="to"
//             value={emailData?.to}
//             onChange={handleInputChange}
//             error={errors.to}
//             size="small"
//           />
//           {errors.to && (
//             <Typography variant="caption" color="error">
//               To is required
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             // required
//             fullWidth
//             label="Subject"
//             name="subject"
//             value={emailData?.subject}
//             onChange={handleInputChange}
//             size="small"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             multiline
//             required
//             rows={10}
//             cols={90}
//             label="Message "
//             name="message"
//             value={emailData?.message}
//             onChange={handleInputChange}
//             error={errors.message}
//             helperText={errors.message ? "Message is required" : ""}
//           />
//         </Grid>
//         <br />
//         <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button type="submit" variant="contained">
//             Send
//           </Button>
//           <Button
//             type="button"
//             variant="contained"
//             color="error"
//             onClick={onClose}
//             style={{ marginLeft: "10px" }}
//           >
//             Cancel
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }

// export default EmailForm;

import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import useIndividualEmailForm from "../../hooks/email/individualEmail/useIndividualEmailForm";

const Email = ({ employeeId, onClose, officeEmail }) => {
  const { formik } = useIndividualEmailForm(employeeId, onClose);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
          id="to"
          name="to"
          label="To"
          fullWidth
          required
          value={officeEmail}
          onChange={formik.handleChange}
          error={formik.touched.to && Boolean(formik.errors.to)}
          helperText={formik.touched.to && formik.errors.to}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="subject"
          name="subject"
          label="Subject"
          fullWidth
          required
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="message"
          name="message"
          label="Message"
          fullWidth
          required
          multiline
          rows={10}
          cols={90}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
        >
          Send
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          color="error"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default Email;
