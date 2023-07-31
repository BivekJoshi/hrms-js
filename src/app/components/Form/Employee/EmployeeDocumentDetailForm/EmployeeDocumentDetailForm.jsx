import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useAddDocumentForm from "../../../../hooks/employee/AddDocument/useAddDocumentForm";
import { useGetDocumentByDocumentType } from "../../../../hooks/employee/useDocument";
import { useParams } from "react-router-dom";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";

const documentType = [
  {
    label: "Employee Photo",
    input: "EMPLOYEE_PHOTO",
    id: 1,
  },
  {
    label: "Curriculum Vitae",
    input: "CURRICULUM_VITAE",
    id: 2,
  },
  {
    label: "Citizenship",
    input: "CITIZENSHIP",
    id: 3,
  },
  {
    label: "PAN Card",
    input: "PAN_CARD",
    id: 4,
  },
  {
    label: "Academic Document",
    input: "ACADEMIC_DOCUMENT",
    id: 5,
  },
  {
    label: "Training Certificate",
    input: "TRAINING_CERTIFICATE",
    id: 6,
  },
  {
    label: "Certification",
    input: "CERTIFICATION",
    id: 7,
  },
  {
    label: "Experience Letter",
    input: "EXPERIENCE_LETTER",
    id: 8,
  },
  {
    label: "Award and Achievement",
    input: "AWARD_AND_ACHIEVEMENT",
    id: 9,
  },
  {
    label: "Signed Contract",
    input: "SIGNED_CONTRACT",
    id: 10,
  },
  {
    label: "Health Insurance",
    input: "HEALTH_INSURANCE",
    id: 11,
  },
  {
    label: "Other Document",
    input: "OTHER_DOCUMENT ",
    id: 12,
  },
];

const EmployeeDocumentDetailForm = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");

  const { data: documentPhoto } = useGetDocumentByDocumentType(
    id,
    selectedDocument
  );
    let data
  if (documentPhoto && documentPhoto.length > 0) {
    const path = documentPhoto[0].path;
    const url = DOC_URL
    data=url+path;
  } else {
    console.log("No document photo available.");
  }

  const { formik } = useAddDocumentForm({ selectedDocument });

  const handleFormSubmit = (documentType) => {
    formik.setFieldValue("documentType", documentType);
    formik.handleSubmit(documentType);
  };
  const handleChange = (panel, doc) => (_, isExpanded) => {
    setSelectedDocument(doc);
    setExpandedAccordion(isExpanded ? panel : null);
  };


  const handleChangeImage = (e) => {
    setSelectedDocument(e.target.files[0]);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div style={{ display: "flex", marginLeft: "5%", marginTop: "2%" }}>
            image
             {documentPhoto && <img src={data} alt="Document" width={460} height={500}  />}
          </div>
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
    </div>
  );
};

export default EmployeeDocumentDetailForm;
