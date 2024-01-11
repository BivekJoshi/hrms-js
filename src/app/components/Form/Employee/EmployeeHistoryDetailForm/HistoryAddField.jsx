import {
  Box,
  Fade,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";
import { Preview } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useEditWorkExpirenceDoc } from "../../../../hooks/employee/useEmployeeHistory";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";
import RemarkField from "../../../RemarkField/RemarkField";

const HistoryAddField = ({ formik }) => {
  const { mode } = useContext(ThemeModeContext);

  const id = formik.values?.id;

  const updateWorkExpericence = useEditWorkExpirenceDoc(id);

  const currentDate = new Date().toISOString().split("T")[0];

  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [documentImg, setDocumnetImage] = useState(null);

  const handleImageChange = (event) => {
    const value = event.target?.files[0];
    formik.setFieldValue("experienceLetter", value);
    if (id) {
      const formData = new FormData();
      formData.append("file", value);
      formData.append("documentType", "experienceLetter");
      updateWorkExpericence.mutate(formData);
    }
    if (value) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(value);
    }
  };

  const openPreview = (imageUrl) => {
    setDocumnetImage(imageUrl);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    minWidth: "70vh",
    boxShadow: 24,
    p: "12px 24px",
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id={`employerName`}
            name={`employerName`}
            label="Organization Name"
            fullWidth
            value={formik.values.employerName}
            onChange={formik.handleChange}
            error={
              formik.touched.employerName && Boolean(formik.errors.employerName)
            }
            helperText={
              formik.touched.employerName && formik.errors.employerName
            }
            InputLabelProps={{ shrink: Boolean(formik.values.employerName) }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={`employerAddress`}
            name={`employerAddress`}
            label="Organization Address"
            fullWidth
            // required
            value={formik.values.employerAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.employerAddress &&
              Boolean(formik.errors.employerAddress)
            }
            helperText={
              formik.touched.employerAddress && formik.errors.employerAddress
            }
            InputLabelProps={{ shrink: Boolean(formik.values.employerAddress) }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={`pastPosition`}
            name={`pastPosition`}
            label="Past Position"
            fullWidth
            // required
            value={formik.values.pastPosition}
            onChange={formik.handleChange}
            error={
              formik.touched.pastPosition && Boolean(formik.errors.pastPosition)
            }
            helperText={
              formik.touched.pastPosition && formik.errors.pastPosition
            }
            InputLabelProps={{ shrink: Boolean(formik.values.pastPosition) }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={`fromDate`}
            name={`fromDate`}
            label="From Date"
            fullWidth
            type="date"
            inputProps={{
              max: currentDate,
            }}
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            helperText={formik.touched.fromDate && formik.errors.fromDate}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={`toDate`}
            name={`toDate`}
            label="To Date"
            fullWidth
            type="date"
            inputProps={{
              max: currentDate,
            }}
            value={formik.values.toDate}
            onChange={formik.handleChange}
            error={formik.touched.toDate && Boolean(formik.errors.toDate)}
            helperText={formik.touched.toDate && formik.errors.toDate}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            id={`remarks`}
            name={`remarks`}
            label="Remarks"
            fullWidth
            // required
            multiline
            minRows={3}
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && formik.errors.remarks}
            variant="outlined"
            size="small"
          /> */}
          <RemarkField
            id="remarks"
            name="remarks"
            label="Remarks"
            fullWidth
            formik={formik}
            maxLength={255}
            variant="outlined"
            multiline
            InputLabelProps={{
              shrink: Boolean(formik.values.remarks),
            }}
            rows={4}
            inputProps={{ maxLength: 255 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Upload Experience Documnet</FormLabel>
          <div style={{ display: "flex" }}>
            <Input
              type="file"
              accept="image/*"
              fullWidth
              id="experienceLetter"
              name="experienceLetter"
              onChange={handleImageChange}
            />
            {(formik?.values?.experienceLetter ||
              formik?.values?.experiencePath) && (
              <Tooltip title="Preview">
                <Preview
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                    color: mode === "dark" ? "#fcfcfc" : "",
                  }}
                  onClick={() =>
                    openPreview(
                      formik?.values?.experienceLetter ||
                        formik?.values?.experiencePath
                    )
                  }
                />
              </Tooltip>
            )}
          </div>
        </Grid>
      </Grid>
      <Modal
        open={isPreviewOpen}
        onClose={closePreview}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
      >
        <Fade in={isPreviewOpen}>
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                height: "2rem",
                margin: "3px 2px",
              }}
            >
              <IconButton sx={{ cursor: "pointer" }} onClick={closePreview}>
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              {" "}
              <img
                src={previewImage ? previewImage : `${DOC_URL}${documentImg}`}
                alt="Preview"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  color: mode === "dark" ? "#fcfcfc" : "",
                }}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HistoryAddField;
