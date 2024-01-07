import { Accordion, AccordionDetails, Chip, Divider } from "@mui/material";
import { AccordionSummary, Button } from "@mui/material";
import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useAddDocument,
  useDeleteDocument,
  useGetDocumentByDocumentType,
  useGetDocumentById,
} from "../../../../hooks/employee/useDocument";
import { useParams } from "react-router-dom";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";
import { documentType } from "./documentType";
import { EditDocumentModal } from "./EditDocumentModal";
import deleteIcon from "../../../../../assets/approve.png";
import updateIcon from "../../../../../assets/update.png";

const EmployeeDocumentDetailForm = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState("panel1");

  const [selectedDocument, setSelectedDocument] = useState("EMPLOYEE_PHOTO");
  const [document, setDocument] = useState("");
  const [imagePreviewMap, setImagePreviewMap] = useState({});

  const [editedDocument, setEditedDocument] = useState({});
  const handleCloseEditModal = () => setOpenEditModal(false);

  const docPathSelected = document?.name;

  const { mutate: deleteDocument } = useDeleteDocument({});
  const { mutate: addDocument, isSuccess } = useAddDocument({});

  const { data: documentPhoto, refetch } = useGetDocumentByDocumentType(
    id,
    selectedDocument || documentType[0]?.input
  );
  const { data: getDocument, isLoading } = useGetDocumentById(id);

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  const url = DOC_URL;

  const handleChange = (panel, doc) => (_, isExpanded) => {
    setSelectedDocument(doc);
    setExpandedAccordion(isExpanded ? panel : null);
    setDocument("");
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setDocument(file);

    // Reset the input value to null to allow selecting the same file again
    e.target.value = null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewMap((prevMap) => ({
          ...prevMap,
          [expandedAccordion]: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      // Handle form submission when an image is selected
      const values = {
        documentType: selectedDocument || documentType[0]?.input,
        document: file,
      };
      addDocument(values);
    }
  };

  const handleDelete = (document) => {
    const { id } = document;
    deleteDocument(id);

    setSelectedDocument("");
    setDocument("");
    setImagePreviewMap((prevMap) => ({
      ...prevMap,
      [expandedAccordion]: undefined,
    }));
  };

  const handleEditFormSubmit = (document) => {
    setEditedDocument(document);
    setOpenEditModal(true);
  };

  {
    !isLoading && <div>loading</div>;
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <Grid display="flex" justifyContent="center">
            {expandedAccordion && imagePreviewMap[expandedAccordion] && (
              <img
                src={imagePreviewMap[expandedAccordion]}
                alt="Preview"
                width={240}
                height={240}
                style={{
                  objectFit: "contain",
                }}
              />
            )}
          </Grid>
          {documentPhoto &&
            documentPhoto.map((document) => (
              <Grid
                key={document?.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  paddingRight: "2rem",
                }}
              >
                <Box display="flex" justifyContent="center">
                  {expandedAccordion && !imagePreviewMap[expandedAccordion] && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography variant="h6">Uploaded Document</Typography>
                      <img
                        src={`${url}${document?.path}`}
                        alt="Document"
                        width={240}
                        height={240}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </Box>
                <Grid
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: ".5rem",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditFormSubmit(document)}
                    startIcon={<img src={updateIcon} />}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(document)}
                    startIcon={<img src={deleteIcon} />}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}
          {/* <Grid display='flex' justifyContent='center'>
            {expandedAccordion && imagePreviewMap[expandedAccordion] && (
              <>
                <Grid
                  key={document?.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    paddingRight: '2rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <Typography variant='h6'>Preview Document</Typography>
                    <img
                      src={imagePreviewMap[expandedAccordion]}
                      alt='Preview'
                      width={240}
                      height={240}
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <Box display='flex' justifyContent='center'>
                    <Grid
                      sm={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {/* <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleEditFormSubmit(document)}
                        startIcon={<img src={updateIcon} />}
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                      >
                        Update
                      </Button>
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => handleDelete(document)}
                        startIcon={<img src={deleteIcon} />}
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                      >
                        Delete
                    </Grid>
                  </Box>
                </Grid>
              </>
            )}
          </Grid> */}
        </Grid>

        <Grid item xs={12} sm={6}>
          {documentType &&
            documentType.map((document, index) => {
              const isInputDisabled =
                index === 0
                  ? documentPhoto?.some(
                      (photo) => photo?.documentType === "EMPLOYEE_PHOTO"
                    )
                  : documentPhoto?.some(
                      (photo) => photo?.documentType === selectedDocument
                    );

              return (
                <Accordion
                  key={document.id}
                  expanded={expandedAccordion === `panel${document?.id}`}
                  onChange={handleChange(
                    `panel${document?.id}`,
                    document?.input
                  )}
                  sx={{
                    margin: "0 !important",
                    borderBottom: "1px solid black",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    aria-controls={`panel${document.id}a-content`}
                    id={`panel${document.id}a-header`}
                  >
                    <Typography variant="h7" sx={{ fontWeight: 500 }}>
                      {document?.label}
                    </Typography>
                    {getDocument?.map((data, index) => {
                      if (document.input === data.documentType) {
                        return <Chip label="Uploaded" color="success" />;
                      }
                    })}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <label htmlFor="file">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleChangeImage(e)}
                          style={{ display: "none" }}
                          disabled={isInputDisabled}
                          id="file"
                        />
                        <Box
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            border: "1px solid #B9BEC7",
                            borderRadius: ".3rem",
                            // width: "450px",
                          }}
                          component="span"
                        >
                          <div
                            style={{
                              backgroundColor: "#E7E0EB",
                              padding: ".5rem",
                              borderRadius: ".3rem",
                              minWidth: "20%",
                              fontWeight: 500,
                            }}
                          >
                            Choose file
                          </div>
                          <div
                            style={{
                              minwidth: "50%",
                              color: "#B9BEC7",
                              padding: ".3rem",
                            }}
                          >
                            {
                              <p>
                                {docPathSelected
                                  ? docPathSelected
                                  : "No file choosen"}
                              </p>
                            }
                          </div>
                        </Box>
                      </label>
                      {/* <Button
                      variant='outlined'
                      disabled={uploadStatusMap[expandedAccordion]}
                      onClick={() => {
                        handleFormSubmit(document.input);
                      }}
                      sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                      Upload
                    </Button> */}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Grid>
      </Grid>
      {openEditModal && (
        <EditDocumentModal
          id={editedDocument?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default EmployeeDocumentDetailForm;
