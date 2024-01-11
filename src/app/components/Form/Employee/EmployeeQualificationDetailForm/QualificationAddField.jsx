import {
  Autocomplete,
  Fade,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useContext } from "react";
import { useEditQualificationDocument } from "../../../../hooks/employee/useQualification";
import { Preview } from "@mui/icons-material";
import { useState } from "react";
import { Box } from "@mui/system";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";
import ThemeModeContext from "../../../../../theme/ThemeModeContext";

const passedLevel = [
  {
    id: "SLC",
    label: "SLC / SEE",
  },
  {
    id: "PLUS_TWO",
    label: "Plus Two",
  },
  {
    id: "BACHELORS",
    label: "Bachelors",
  },
  {
    id: "POST_GRADUATE",
    label: "Post Graduate",
  },
  {
    id: "MASTERS",
    label: "Masters",
  },
  {
    id: "PHD",
    label: "PHD",
  },
];

const scoreType = [
  {
    id: "PERCENT",
    label: "Percentage",
  },
  {
    id: "GPA",
    label: "Grade",
  },
];

const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
); // Change 100 to adjust the range of available years

const QualificationAddField = ({ passedLevelData, formik }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [documentImg, setDocumnetImage] = useState(null);
  const { mode } = useContext(ThemeModeContext);

  const id = formik.values?.id;

  const updateDocumentImg = useEditQualificationDocument(id);

  const handleImageChange = (fileName, event) => {
    formik.setFieldValue(fileName, event.target.files[0]);
    if (id) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("documentType", fileName);

      updateDocumentImg.mutate(formData);
    }
    const file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "12px 24px",
  };

  const valuesToRemove = passedLevelData.map((item) => item.passedlevel);

  const filteredPassedLevel = passedLevel.filter(
    (item) => !valuesToRemove.includes(item.id)
  );

  const passedLevelOptions = formik?.values?.id
    ? passedLevel
    : filteredPassedLevel;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          id={`passedLevel`}
          name={`passedLevel`}
          label="Passed Level"
          fullWidth
          select
          disabled={formik?.values?.id && Boolean(formik?.values?.id)}
          value={formik.values.passedLevel}
          onChange={formik.handleChange}
          error={
            formik.touched.passedLevel && Boolean(formik.errors.passedLevel)
          }
          helperText={formik.touched.passedLevel && formik.errors.passedLevel}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: Boolean(formik.values.passedLevel) }}
        >
          {passedLevelOptions?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Autocomplete
          options={years}
          onChange={(e, newValue) => {
            formik.setFieldValue(`passedYear`, newValue);
          }}
          value={formik.values.passedYear}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                id={`passedYear`}
                name={`passedYear`}
                label="Passed Year (A.D.)"
                fullWidth
                error={
                  formik.touched.passedYear && Boolean(formik.errors.passedYear)
                }
                helperText={
                  formik.touched.passedYear && formik.errors.passedYear
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: Boolean(formik.values.passedYear) }}
              />
            );
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id={`scoreType`}
          name={`scoreType`}
          label="Score type"
          fullWidth
          select
          // required
          value={formik.values.scoreType}
          onChange={formik.handleChange}
          error={formik.touched.scoreType && Boolean(formik.errors.scoreType)}
          helperText={formik.touched.scoreType && formik.errors.scoreType}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: Boolean(formik.values.scoreType) }}
        >
          {scoreType?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id={`grade`}
          name={`grade`}
          label="Score"
          fullWidth
          value={formik.values.grade}
          onChange={formik.handleChange}
          error={formik.touched.grade && Boolean(formik.errors.grade)}
          helperText={formik.touched.grade && formik.errors.grade}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: Boolean(formik.values.grade) }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          id={`board`}
          name={`board`}
          label="Board"
          fullWidth
          required
          value={formik.values.board}
          onChange={formik.handleChange}
          error={formik.touched.board && Boolean(formik.errors.board)}
          helperText={formik.touched.board && formik.errors.board}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: Boolean(formik.values.board) }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          id={`institute`}
          name={`institute`}
          label="Institude"
          fullWidth
          required
          value={formik.values.institute}
          onChange={formik.handleChange}
          error={formik.touched.institute && Boolean(formik.errors.institute)}
          helperText={formik.touched.institute && formik.errors.institute}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: Boolean(formik.values.institute) }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormLabel component="legend">Upload Transcript</FormLabel>
        <div style={{ display: "flex" }}>
          <Input
            type="file"
            fullWidth
            id="transcript"
            accept="image/*"
            name="transcript"
            onChange={(e) => handleImageChange("transcript", e)}
          />
          {(formik?.values?.transcript || formik.values?.transcriptPath) && (
            <Tooltip title="Preview">
              <Preview
                sx={{
                  mt: 1,
                  cursor: "pointer",
                  color: mode === "dark" ? "#fcfcfc" : "",
                }}
                onClick={() =>
                  openPreview(
                    formik?.value?.transcript || formik.values?.transcriptPath
                  )
                }
              />
            </Tooltip>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload Character Certificate</FormLabel>
        <div style={{ display: "flex" }}>
          <Input
            type="file"
            accept="image/*"
            fullWidth
            id="characterCertificate"
            name="characterCertificate"
            onChange={(e) => handleImageChange("characterCertificate", e)}
          />
          {(formik?.values?.characterCertificate ||
            formik.values?.characterCertificatePath) && (
            <Tooltip title="Preview">
              <Preview
                sx={{
                  mt: 1,
                  cursor: "pointer",
                  color: mode === "dark" ? "#fcfcfc" : "",
                }}
                onClick={() =>
                  openPreview(
                    formik?.value?.characterCertificate ||
                      formik.values?.characterCertificatePath
                  )
                }
              />
            </Tooltip>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <FormLabel component="legend">Upload other Document</FormLabel>
        <div style={{ display: "flex" }}>
          <Input
            type="file"
            accept="image/*"
            fullWidth
            id="otherDocument"
            name="otherDocument"
            onChange={(e) => handleImageChange("otherDocument", e)}
          />
          {(formik?.values?.otherDocument ||
            formik.values?.otherDocumentPath) && (
            <Tooltip title="Preview">
              <Preview
                sx={{
                  mt: 1,
                  cursor: "pointer",
                  color: mode === "dark" ? "#fcfcfc" : "",
                }}
                onClick={() =>
                  openPreview(
                    formik?.value?.otherDocument ||
                      formik.values?.otherDocumentPath
                  )
                }
              />
            </Tooltip>
          )}
        </div>
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
    </Grid>
  );
};

export default QualificationAddField;
