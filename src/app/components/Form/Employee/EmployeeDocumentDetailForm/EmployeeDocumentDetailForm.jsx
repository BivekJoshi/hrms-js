import { Accordion, AccordionDetails } from "@mui/material";
import { AccordionSummary, Button } from "@mui/material";
import { Grid, Typography, Stack, Box } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  useDeleteDocument,
  useGetDocumentByDocumentType,
} from "../../../../hooks/employee/useDocument";
import { useParams } from "react-router-dom";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";
import { documentType } from "./documentType";
import { useAddDocumentForm } from "../../../../hooks/employee/AddDocument/useAddDocumentForm";
import { EditDocumentModal } from "./EditDocumentModal";

const EmployeeDocumentDetailForm = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [document, setDocument] = useState("");
  const [editedDocument, setEditedDocument] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);

  const { mutate: deleteDocument } = useDeleteDocument({});
  const { formik } = useAddDocumentForm({ document });

  const { data: documentPhoto } = useGetDocumentByDocumentType(
    id,
    selectedDocument || documentType[0]?.input 
  );
  console.log(documentType);
  const url = DOC_URL;

  const handleFormSubmit = (documentType) => {
    if (document) {
      formik.setFieldValue("documentType", documentType);
      formik.handleSubmit(documentType);
    }
  };

  const handleChange = (panel, doc) => (_, isExpanded) => {
    setSelectedDocument(doc);
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const handleChangeImage = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleDelete = (document) => {
    const { id } = document;
    deleteDocument(id);
  };

  const handleEditFormSubmit = (document) => {
    setEditedDocument(document);
    setOpenEditModal(true);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          {documentPhoto &&
            documentPhoto.map((document) => (
              <Grid
                key={document?.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginLeft: "15vh",
                  position: "relative",
                  paddingRight:"2rem"
                }}
              >
                <Box>
                  <img
                    src={`${url}${document?.path}`}
                    alt="Document"
                    width={240}
                    height={140}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: ".5rem",
                    position: "absolute",
                    bottom: "10px",
                    left: "20vh",
                    textAlign:"center"
                  }}
                >
                  <Button
                    sx={{ width: "fit-content" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditFormSubmit(document)}
                  >
                    Update
                  </Button>
                  <Button
                    sx={{ width: "fit-content" }}
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(document)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}
        </Grid>

        <Grid item xs={12} sm={6}>
          {documentType &&
            documentType.map((document) => (
              <Accordion
                key={document.id}
                expanded={expandedAccordion === `panel${document?.id}`}
                onChange={handleChange(`panel${document?.id}`, document?.input)}
              >
                <AccordionSummary
                  aria-controls={`panel${document.id}a-content`}
                  id={`panel${document.id}a-header`}
                >
                  <Typography>{document?.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <input
                    type="file"
                    ref={fileInputRef}
                    label="citizenship"
                    onChange={handleChangeImage}
                  />
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => {
                      handleFormSubmit(document.input);
                    }}
                  >
                    Upload
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
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
