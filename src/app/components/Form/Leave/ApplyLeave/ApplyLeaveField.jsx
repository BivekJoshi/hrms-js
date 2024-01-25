// import {
//   Autocomplete,
//   Box,
//   Button,
//   Divider,
//   Grid,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import { Typography, Tab, RadioGroup } from "@mui/material";
// import { FormControlLabel, Radio } from "@mui/material";
// import React, { useState } from "react";
// import { useGetLeaveType } from "../../../../hooks/leaveType/useLeaveType";
// import useApplyLeaveForm from "../../../../hooks/leave/LeaveForm/useApplyLeaveForm";
// import { useLocation } from "react-router-dom";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import RemarkField from "../../../RemarkField/RemarkField";

// const leaveOptions = [
//   { id: "HALF_DAY", label: "Half Day" },
//   { id: "ONE_DAY", label: "One Day" },
//   { id: "MULTI_DAY", label: "Multiple Days" },
// ];

// const ApplyLeaveField = () => {
//   const location = useLocation();
//   const data = location?.state?.data || null;
//   const { formik } = useApplyLeaveForm(data);

//   const { data: leaveTypeData } = useGetLeaveType();

//   const handleFormSubmit = () => {
//     formik.handleSubmit();
//   };

//   const capitalize = (str) => {
//     if (str) {
//       return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//     }
//   };

//   const getLeaveTypeName = (leaveTypeId) => {
//     const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
//     return leaveType ? leaveType.leaveName : "";
//   };

//   const submitButtonText = data ? "Update Leave" : "Add Leave";
//   const handleChange = (e) => {
//     formik.setFieldValue("leavePeriod", e.target?.value);
//   };

//   const value = formik.values?.leavePeriod;

//   const determineLeavePeriod = () => {
//     if (data) {
//       const leaveDays = data?.applyLeaveDays;
//       if (leaveDays > 0 && leaveDays < 1) {
//         return "HALF_DAY";
//       } else if (leaveDays > 1) {
//         return "MULTI_DAY";
//       } else if (leaveDays == 1) {
//         return "ONE_DAY";
//       } else {
//        
//       }
//     }
//   };
//   const leavePeriod = determineLeavePeriod();

//   return (
//     <>
//       <Typography variant="h6" textAlign="center" mb={2}>
//         <b>Apply Leave</b>
//       </Typography>
//       <Divider sx={{ mb: "1rem" }} />
//       <Grid container spacing={3}>
//         {data && (
//           <Grid item xs={12} sm={6}>
//             Leave Type
//           </Grid>
//         )}
//         {data ? (
//           <Grid item xs={12} sm={12}>
//             <TextField
//               name="leaveTypeId"
//               label="Leave Type"
//               required
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               value={getLeaveTypeName(formik.values.leaveTypeId)}
//               error={
//                 formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
//               }
//               helperText={
//                 formik.touched.leaveTypeId && formik.errors.leaveTypeId
//               }
//             />
//           </Grid>
//         ) : (
//           <Grid item xs={12} sm={12}>
//             <Autocomplete
//               id="leaveTypeId"
//               name="leaveTypeId"
//               options={leaveTypeData}
//               getOptionLabel={(option) =>
//                 `${capitalize(option.leaveName)} Leave`
//               }
//               value={formik.values.leaveTypeId || null}
//               onChange={(event, value) =>
//                 formik.setFieldValue("leaveTypeId", value)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Leave Type"
//                   fullWidth
//                   required
//                   error={
//                     formik.touched.leaveTypeId &&
//                     Boolean(formik.errors.leaveTypeId)
//                   }
//                   helperText={
//                     formik.touched.leaveTypeId && formik.errors.leaveTypeId
//                   }
//                   variant="outlined"
//                   size="small"
//                 />
//               )}
//             />
//           </Grid>
//         )}

//         <Grid item xs={12} sm={12}>
//           {data ? (
//             <TextField
//               name="leavePeriod"
//               select
//               value={formik.values?.leavePeriod || leavePeriod}
//               label="Leave Period"
//               placeholder="Select leave period"
//               fullWidth
//               required
//               onChange={handleChange}
//               InputLabelProps={{ shrink: Boolean(formik.values.leavePeriod) }}
//               error={
//                 formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
//               }
//               helperText={
//                 formik.touched.leavePeriod && formik.errors.leavePeriod
//               }
//               size="small"
//             >
//               {leaveOptions?.map((option) => (
//                 <MenuItem key={option?.id} value={option?.id}>
//                   {option?.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           ) : (
//             <TextField
//               name="leavePeriod"
//               select
//               value={formik.values?.leavePeriod}
//               label="Leave Period"
//               placeholder="Select leave period"
//               fullWidth
//               required
//               onChange={handleChange}
//               InputLabelProps={{ shrink: Boolean(formik.values.leavePeriod) }}
//               error={
//                 formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
//               }
//               helperText={
//                 formik.touched.leavePeriod && formik.errors.leavePeriod
//               }
//               size="small"
//             >
//               {leaveOptions?.map((option) => (
//                 <MenuItem key={option?.id} value={option?.id}>
//                   {option?.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           )}
//         </Grid>
//         {data ? (
//           <>
//             {" "}
//             {leavePeriod === "HALF_DAY" && (
//               <>
//                 <Autocomplete
//                   id="leaveTypeId"
//                   name="leaveTypeId"
//                   options={leaveTypeData}
//                   getOptionLabel={(option) =>
//                     `${capitalize(option.leaveName)} Leave`
//                   }
//                   value={formik.values.leaveTypeId || null}
//                   onChange={(event, value) =>
//                     formik.setFieldValue("leaveTypeId", value)
//                   }
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Leave Type"
//                       fullWidth
//                       required
//                       error={
//                         formik.touched.leaveTypeId &&
//                         Boolean(formik.errors.leaveTypeId)
//                       }
//                       helperText={
//                         formik.touched.leaveTypeId && formik.errors.leaveTypeId
//                       }
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//                 <RadioGroup
//                   row
//                   aria-labelledby="leave-type-radio-group-label"
//                   name="halfLeaveType"
//                   value={formik.values.halfLeaveType || "FIRST_HALF"}
//                   onChange={formik.handleChange}
//                   style={{ display: "flex", marginTop: "0.6rem" }}
//                 >
//                   <FormControlLabel
//                     value="FIRST_HALF"
//                     control={<Radio />}
//                     label="First Half"
//                   />
//                   <FormControlLabel
//                     value="SECOND_HALF"
//                     control={<Radio />}
//                     label="Second Half"
//                   />
//                 </RadioGroup>
//               </>
//             )}
//             {leavePeriod === "ONE_DAY" && (
//               <TextField
//                 name="fromDate"
//                 label="Select Date"
//                 type="date"
//                 inputProps={{
//                   min: new Date().toISOString().split("T")[0],
//                 }}
//                 required
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//                 value={formik.values.fromDate}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.fromDate && Boolean(formik.errors.fromDate)
//                 }
//                 helperText={formik.touched.fromDate && formik.errors.fromDate}
//                 size="small"
//               />
//             )}
//             {leavePeriod === "MULTI_DAY" && (
//               <>
//                 <TextField
//                   name="fromDate"
//                   label="Date From"
//                   type="date"
//                   inputProps={{
//                     min: new Date().toISOString().split("T")[0],
//                   }}
//                   required
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                   value={formik.values.fromDate}
//                   onChange={formik.handleChange}
//                   error={
//                     formik.touched.fromDate && Boolean(formik.errors.fromDate)
//                   }
//                   helperText={formik.touched.fromDate && formik.errors.fromDate}
//                   size="small"
//                 />
//                 <TextField
//                   name="toDate"
//                   label="Date To"
//                   type="date"
//                   inputProps={{
//                     min:
//                       formik.values.fromDate ||
//                       new Date().toISOString().split("T")[0],
//                   }}
//                   required
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                   value={formik.values.toDate}
//                   onChange={formik.handleChange}
//                   error={formik.touched.toDate && Boolean(formik.errors.toDate)}
//                   helperText={formik.touched.toDate && formik.errors.toDate}
//                   size="small"
//                   disabled={!formik?.values?.fromDate}
//                 />
//               </>
//             )}
//           </>
//         ) : (
//           <Grid item xs={12} sm={12}>
//             {value === "HALF_DAY" && <HalfDay formik={formik} />}
//             {value === "ONE_DAY" && <OneDay formik={formik} />}
//             {value === "MULTI_DAY" && <MultipleDays formik={formik} />}
//           </Grid>
//         )}

//         <Grid item xs={12} sm={12}>
//           <RemarkField
//             id="leaveReason"
//             name="leaveReason"
//             label="Leave Reason"
//             fullWidth
//             req={true}
//             formik={formik}
//             data={data?.leaveReason}
//             maxLength={255}
//             variant="outlined"
//             multiline
//             InputLabelProps={{
//               shrink: Boolean(formik.values.leaveReason),
//             }}
//             rows={3}
//             inputProps={{ maxLength: 255 }}
//           />
//         </Grid>
//         <Grid
//           container
//           direction="row"
//           justifyContent="flex-end"
//           alignItems="flex-end"
//         >
//           <Button
//             variant="contained"
//             onClick={handleFormSubmit}
//             sx={{ mt: 3, ml: 1, color: "#fff", textTransform: "capitalize" }}
//           >
//             {submitButtonText}
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// const DateInput = ({ formik, isHalfDay, isMultipleDays }) => {
//   const [halfType, setHalfType] = useState("FIRST_HALF");

//   const handleFromDateChange = (e) => {
//     const fromDateValue = e.target.value;
//     if (fromDateValue) {
//       setHalfType("FIRST_HALF");
//     }
//     formik.handleChange(e);
//     formik.values.fromDate = e.target.value;
//     formik.values.toDate = e.target.value;
//     formik.values.halfLeaveType = null;
//     if (isHalfDay) {
//       formik.setFieldValue("isHalfDay", true);
//       formik.setFieldValue("halfLeaveType", halfType);
//     }
//   };

//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   const newDate = currentDate.toISOString().split("T")[0];

//   return (
//     <>
//       <div style={{ display: "flex", gap: "0.5rem" }}>
//         <Grid item xs={12} sm={isMultipleDays ? 6 : 12}>
//           <TextField
//             name="fromDate"
//             label={isMultipleDays ? "Date From" : "Select Date"}
//             type="date"
//             inputProps={{
//               min: newDate,
//             }}
//             required
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             value={formik.values.fromDate}
//             onChange={handleFromDateChange}
//             error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
//             helperText={formik.touched.fromDate && formik.errors.fromDate}
//             size="small"
//           />
//         </Grid>
//         {isMultipleDays && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="toDate"
//               label={"Date To"}
//               type="date"
//               inputProps={{
//                 min: formik.values.fromDate || newDate,
//               }}
//               required
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               value={formik.values.toDate}
//               onChange={formik.handleChange}
//               error={formik.touched.toDate && Boolean(formik.errors.toDate)}
//               helperText={formik.touched.toDate && formik.errors.toDate}
//               size="small"
//               disabled={!formik?.values?.fromDate}
//             />
//           </Grid>
//         )}
//       </div>
//       {isHalfDay && (
//         <Grid item xs={12} sm={12}>
//           <RadioGroup
//             row
//             aria-labelledby="demo-row-radio-buttons-group-label"
//             name="halfLeaveType"
//             value={formik.values.halfLeaveType || halfType}
//             onChange={formik.handleChange}
//             style={{ display: "flex", marginTop: "0.6rem" }}
//           >
//             <FormControlLabel
//               value="FIRST_HALF"
//               control={<Radio />}
//               label="First Half"
//             />
//             <FormControlLabel
//               value="SECOND_HALF"
//               control={<Radio />}
//               label="Second Half"
//             />
//           </RadioGroup>
//         </Grid>
//       )}
//     </>
//   );
// };

// const HalfDay = ({ formik }) => <DateInput formik={formik} isHalfDay={true} />;

// const OneDay = ({ formik }) => <DateInput formik={formik} />;

// const MultipleDays = ({ formik }) => (
//   <DateInput formik={formik} isMultipleDays={true} />
// );

// export default ApplyLeaveField;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useApplyLeaveForm from "../../../../hooks/leave/LeaveForm/useApplyLeaveForm";
import { useGetLeaveType } from "../../../../hooks/leaveType/useLeaveType";
import RemarkField from "../../../RemarkField/RemarkField";

const leaveOptions = [
  { id: "HALF_DAY", label: "Half Day" },
  { id: "ONE_DAY", label: "One Day" },
  { id: "MULTI_DAY", label: "Multiple Days" },
];

const ApplyLeaveField = () => {
  const location = useLocation();
  const data = location?.state?.data || null;
  const { formik } = useApplyLeaveForm(data);
  const { data: leaveTypeData } = useGetLeaveType();
  const determineLeavePeriod = () => {
    if (data) {
      const leaveDays = data?.applyLeaveDays;
      if (leaveDays > 0 && leaveDays < 1) {
        return "HALF_DAY";
      } else if (leaveDays === 1) {
        return "ONE_DAY";
      } else if (leaveDays > 1) {
        return "MULTI_DAY";
      }
    }
    return null;
  };

  const leavePeriod = determineLeavePeriod();
  const value = formik.values?.leavePeriod || leavePeriod;
  
  const [selectedLeavePeriod, setSelectedLeavePeriod] = useState(
    formik.values.leavePeriod || leavePeriod
  );

  const submitButtonText = data ? "Update Leave" : "Add Leave";

  // const handleChange = (e) => {
  //   formik.setFieldValue("leavePeriod", e.target?.value);
  // };

  const handleChange = (e) => {
    const selectedPeriod = e.target.value;
    setSelectedLeavePeriod(selectedPeriod);
    formik.setFieldValue("leavePeriod", selectedPeriod);
  };

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypeData?.find((type) => type.id === leaveTypeId);
    return leaveType ? leaveType.leaveName : "";
  };
  const capitalize = (str) => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  

  return (
    <>
      <Typography variant="h6" textAlign="center" mb={2}>
        <b>Apply Leave</b>
      </Typography>
      <Divider sx={{ mb: "1rem" }} />
      <Grid container spacing={3}>
        {data && (
          <Grid item xs={12} sm={6}>
            Leave Type
          </Grid>
        )}
        {data ? (
          <Grid item xs={12} sm={12}>
            <TextField
              name="leaveTypeId"
              label="Leave Type"
              required
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={getLeaveTypeName(formik.values.leaveTypeId)}
              error={
                formik.touched.leaveTypeId && Boolean(formik.errors.leaveTypeId)
              }
              helperText={
                formik.touched.leaveTypeId && formik.errors.leaveTypeId
              }
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <Autocomplete
              id="leaveTypeId"
              name="leaveTypeId"
              options={leaveTypeData}
              getOptionLabel={(option) =>
                `${capitalize(option.leaveName)} Leave`
              }
              value={formik.values.leaveTypeId || null}
              onChange={(event, value) =>
                formik.setFieldValue("leaveTypeId", value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Leave Type"
                  fullWidth
                  required
                  error={
                    formik.touched.leaveTypeId &&
                    Boolean(formik.errors.leaveTypeId)
                  }
                  helperText={
                    formik.touched.leaveTypeId && formik.errors.leaveTypeId
                  }
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Grid>
        )}

        {data ? (
          <Grid item xs={12} sm={12}>
            <TextField
              name="leavePeriod"
              select
              value={selectedLeavePeriod}
              // label="Leave Period"
              // placeholder="Select leave period"
              fullWidth
              required
              onChange={handleChange}
              InputLabelProps={{ shrink: Boolean(formik.values.leavePeriod) }}
              error={
                formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
              }
              helperText={
                formik.touched.leavePeriod && formik.errors.leavePeriod
              }
              size="small"
            >
              {leaveOptions?.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <TextField
              name="leavePeriod"
              select
              value={formik.values?.leavePeriod || leavePeriod}
              label="Leave Period"
              placeholder="Select leave period"
              fullWidth
              required
              onChange={handleChange}
              InputLabelProps={{ shrink: Boolean(formik.values.leavePeriod) }}
              error={
                formik.touched.leavePeriod && Boolean(formik.errors.leavePeriod)
              }
              helperText={
                formik.touched.leavePeriod && formik.errors.leavePeriod
              }
              size="small"
            >
              {leaveOptions?.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        <Grid item xs={12} sm={12} mb={2}>
          {data ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item xs={12} sm={12}>
                {selectedLeavePeriod === "HALF_DAY" && (
                  <>
                    <TextField
                      name="fromDate"
                      label="Select Date"
                      type="date"
                      inputProps={{
                        min: new Date().toISOString().split("T")[0],
                      }}
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formik.values.fromDate}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fromDate &&
                        Boolean(formik.errors.fromDate)
                      }
                      helperText={
                        formik.touched.fromDate && formik.errors.fromDate
                      }
                      size="small"
                    />
                    <RadioGroup
                      row
                      aria-labelledby="leave-type-radio-group-label"
                      name="halfLeaveType"
                      value={formik.values.halfLeaveType || "FIRST_HALF"}
                      onChange={formik.handleChange}
                      style={{ display: "flex", marginTop: "0.6rem" }}
                    >
                      <FormControlLabel
                        value="FIRST_HALF"
                        control={<Radio />}
                        label="First Half"
                      />
                      <FormControlLabel
                        value="SECOND_HALF"
                        control={<Radio />}
                        label="Second Half"
                      />
                    </RadioGroup>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                {selectedLeavePeriod === "ONE_DAY" && (
                  <TextField
                    name="fromDate"
                    label="Select Date"
                    type="date"
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                    required
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formik.values.fromDate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fromDate && Boolean(formik.errors.fromDate)
                    }
                    helperText={
                      formik.touched.fromDate && formik.errors.fromDate
                    }
                    size="small"
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                {selectedLeavePeriod === "MULTI_DAY" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                    }}
                  >
                    <TextField
                      name="fromDate"
                      label="Date From"
                      type="date"
                      inputProps={{
                        min: new Date().toISOString().split("T")[0],
                      }}
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formik.values.fromDate}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fromDate &&
                        Boolean(formik.errors.fromDate)
                      }
                      helperText={
                        formik.touched.fromDate && formik.errors.fromDate
                      }
                      size="small"
                    />
                    <TextField
                      name="toDate"
                      label="Date To"
                      type="date"
                      inputProps={{
                        min:
                          formik.values.fromDate ||
                          new Date().toISOString().split("T")[0],
                      }}
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formik.values.toDate}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.toDate && Boolean(formik.errors.toDate)
                      }
                      helperText={formik.touched.toDate && formik.errors.toDate}
                      size="small"
                      disabled={!formik?.values?.fromDate}
                    />
                  </Box>
                )}
              </Grid>
            </Box>
          ) : (
            <Grid item xs={12} sm={12}>
              {value === "HALF_DAY" && <HalfDay formik={formik} />}
              {value === "ONE_DAY" && <OneDay formik={formik} />}
              {value === "MULTI_DAY" && <MultipleDays formik={formik} />}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          <RemarkField
            id="leaveReason"
            name="leaveReason"
            label="Leave Reason"
            fullWidth
            req={true}
            formik={formik}
            data={data?.leaveReason}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.leaveReason),
            }}
            rows={3}
            inputProps={{ maxLength: 255 }}
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
            sx={{ mt: 3, ml: 1, color: "#fff", textTransform: "capitalize" }}
          >
            {submitButtonText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const DateInput = ({ formik, isHalfDay, isMultipleDays }) => {
  const [halfType, setHalfType] = useState("FIRST_HALF");

  const handleFromDateChange = (e) => {
    const fromDateValue = e.target.value;
    if (fromDateValue) {
      setHalfType("FIRST_HALF");
    }
    formik.handleChange(e);
    formik.values.fromDate = e.target.value;
    formik.values.toDate = e.target.value;
    formik.values.halfLeaveType = null;
    if (isHalfDay) {
      formik.setFieldValue("isHalfDay", true);
      formik.setFieldValue("halfLeaveType", halfType);
    }
  };

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const newDate = currentDate.toISOString().split("T")[0];

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Grid item xs={12} sm={isMultipleDays ? 6 : 12}>
          <TextField
            name="fromDate"
            label={isMultipleDays ? "Date From" : "Select Date"}
            type="date"
            inputProps={{
              min: newDate,
            }}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fromDate}
            onChange={handleFromDateChange}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            helperText={formik.touched.fromDate && formik.errors.fromDate}
            size="small"
          />
        </Grid>
        {isMultipleDays && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="toDate"
              label={"Date To"}
              type="date"
              inputProps={{
                min: formik.values.fromDate || newDate,
              }}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.toDate}
              onChange={formik.handleChange}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
              size="small"
              disabled={!formik?.values?.fromDate}
            />
          </Grid>
        )}
      </div>
      {isHalfDay && (
        <Grid item xs={12} sm={12}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="halfLeaveType"
            value={formik.values.halfLeaveType || halfType}
            onChange={formik.handleChange}
            style={{ display: "flex", marginTop: "0.6rem" }}
          >
            <FormControlLabel
              value="FIRST_HALF"
              control={<Radio />}
              label="First Half"
            />
            <FormControlLabel
              value="SECOND_HALF"
              control={<Radio />}
              label="Second Half"
            />
          </RadioGroup>
        </Grid>
      )}
    </>
  );
};

const HalfDay = ({ formik }) => <DateInput formik={formik} isHalfDay={true} />;

const OneDay = ({ formik }) => <DateInput formik={formik} />;

const MultipleDays = ({ formik }) => (
  <DateInput formik={formik} isMultipleDays={true} />
);

export default ApplyLeaveField;
