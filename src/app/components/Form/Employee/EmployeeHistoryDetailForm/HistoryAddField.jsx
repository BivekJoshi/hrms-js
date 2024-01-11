import {
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";

const HistoryAddField = ({ formik }) => {
  const { mode } = useContext(ThemeModeContext);

  const currentDate = new Date().toISOString().split("T")[0];

  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [documentImg, setDocumnetImage] = useState(null);

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };
  
  const openPreview = (imageUrl) => {
    setDocumnetImage(imageUrl);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id={`employerName`}
            name={`employerName`}
            label="Organization Name"
            placeholder="Enter organization Name"
            fullWidth
            value={formik.values.employerName}
            onChange={formik.handleChange}
            error={
              formik.touched.employerName && Boolean(formik.errors.employerName)
            }
            helperText={
              formik.touched.employerName && formik.errors.employerName
            }
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={`employerAddress`}
            name={`employerAddress`}
            label="Organization Address"
            placeholder="Enter organization address"
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
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id={`pastPosition`}
            name={`pastPosition`}
            label="Past Position"
            placeholder="Enter past position"
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
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={`fromDate`}
            name={`fromDate`}
            label="From Date"
            placeholder="Enter from date"
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
            placeholder="Enter to date"
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
          <TextField
            id={`remarks`}
            name={`remarks`}
            label="Remarks"
            placeholder="Enter remarks"
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
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Upload Experience Documnet</FormLabel>

          <Input
            type="file"
            accept="image/*"
            fullWidth
            id="image"
            name="image"
            onChange={handleImageChange}
          />
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
            <img
              src={previewImage ? previewImage : `${DOC_URL}${documentImg}`}
              alt="Preview"
              style={{ width: "100%", color: mode === "dark" ? "#fcfcfc" : "" }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HistoryAddField;
