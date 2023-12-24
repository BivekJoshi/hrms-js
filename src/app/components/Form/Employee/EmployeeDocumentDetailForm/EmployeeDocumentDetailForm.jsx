import { Accordion, AccordionDetails } from "@mui/material";
import { AccordionSummary, Button } from "@mui/material";
import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useAddDocument,
  useDeleteDocument,
  useGetDocumentByDocumentType,
} from "../../../../hooks/employee/useDocument";
import { useParams } from "react-router-dom";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";
import { documentType } from "./documentType";
import { EditDocumentModal } from "./EditDocumentModal";

const EmployeeDocumentDetailForm = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState("panel1");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [document, setDocument] = useState("");
  const [imagePreviewMap, setImagePreviewMap] = useState({});
  const [editedDocument, setEditedDocument] = useState({});
  const [uploadStatusMap, setUploadStatusMap] = useState({});
  const handleCloseEditModal = () => setOpenEditModal(false);

  const { mutate: deleteDocument } = useDeleteDocument({});
  const { mutate: addDocument } = useAddDocument({});

  const { data: documentPhoto } = useGetDocumentByDocumentType(
    id,
    selectedDocument || documentType[0]?.input
  );

  const url = DOC_URL;

  const handleFormSubmit = (documentType) => {
    if (document) {
      const values = { documentType, document };
      addDocument(values);

      setUploadStatusMap((prevMap) => ({
        ...prevMap,
        [expandedAccordion]: true,
      }));
    }
  };

  const handleChange = (panel, doc) => (_, isExpanded) => {
    setSelectedDocument(doc);
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setDocument(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewMap((prevMap) => ({
          ...prevMap,
          [expandedAccordion]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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
                  // marginLeft: "15vh",
                  // paddingRight: "2rem",
                }}
              >
                <Box display="flex" justifyContent="center">
                  {expandedAccordion && !imagePreviewMap[expandedAccordion] && (
                    <img
                      src={`${url}${document?.path}`}
                      alt="Document"
                      width={240}
                      height={240}
                      style={{
                        objectFit: "contain",
                      }}
                    />
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
                </Grid>
              </Grid>
            ))}
        </Grid>

        <Grid item xs={12} sm={6}>
          {documentType &&
            documentType.map((document, index) => (
              <Accordion
                key={document.id}
                expanded={expandedAccordion === `panel${document?.id}`}
                onChange={handleChange(`panel${document?.id}`, document?.input)}
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
                  <Typography>{document?.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChangeImage}
                  />
                  <Button
                    variant="contained"
                    type="button"
                    disabled={uploadStatusMap[expandedAccordion]}
                    onClick={() => {
                      handleFormSubmit(document.input);
                    }}
                  >
                    Upload
                  </Button>
                  {/* {imagePreview && selectedDocument && (
                    <img
                      key={document.id}
                      src={imagePreview}
                      alt="Selected Profile"
                      // style={{ width: "50%" }}
                      height="200px"
                      width="200px"
                    />
                  )} */}
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
