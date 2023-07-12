import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import useAddDocumentForm from '../../../../hooks/employee/AddDocument/useAddDocumentForm';
import { useAddDocument } from '../../../../hooks/employee/useDocument';

const documentType = [
  {
    label: 'Employee Photo',
    input: 'EMPLOYEE_PHOTO',
    id: 1,
  },
  {
    label: 'Curriculum Vitae',
    input: 'CURRICULUM_VITAE',
    id: 2,
  },
  {
    label: 'Citizenship',
    input: 'CITIZENSHIP',
    id: 3,
  },
  {
    label: 'PAN Card',
    input: 'PAN_CARD',
    id: 4,
  },
  {
    label: 'Academic Document',
    input: 'ACADEMIC_DOCUMENT',
    id: 5,
  },
  {
    label: 'Training Certificate',
    input: 'TRAINING_CERTIFICATE',
    id: 6,
  },
  {
    label: 'Certification',
    input: 'CERTIFICATION',
    id: 7,
  },
  {
    label: 'Experience Letter',
    input: 'EXPERIENCE_LETTER',
    id: 8,
  },
  {
    label: 'Award and Achievement',
    input: 'AWARD_AND_ACHIEVEMENT',
    id: 9,
  },
  {
    label: 'Signed Contract',
    input: 'SIGNED_CONTRACT',
    id: 10,
  },
  {
    label: 'Health Insurance',
    input: 'HEALTH_INSURANCE',
    id: 11,
  },
  {
    label: 'Other Document',
    input: 'OTHER_DOCUMENT ',
    id: 12,
  },
];

const EmployeeDocumentDetailForm = () => {
  const fileInputRef = useRef(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [document, setDocument] = useState('');
  const { mutate } = useAddDocument({});
  const [selectedDocument, setSelectedDocument] = useState('');

  const { formik } = useAddDocumentForm({ document });
  const handleFormSubmit = (documentType) => {
    formik.setFieldValue('documentType', documentType);
    formik.handleSubmit(documentType);

    // if (formik.isValid) {
    //   formik.setTouched({
    //     departmentName: true,
    //     departmentType: true,
    //     departmentDescription: true,
    //   });
    //   onClose();
    // } else {
    //   toast.error('Please make sure you have filled the form correctly');
    // }
  };
  const handleChange = (panel) => (_, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const handleChangeImage = (e) => {
    setDocument(e.target.files[0]);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div
            style={{ display: 'flex', marginLeft: '5%', marginTop: '2%' }}
          ></div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {documentType.map((document) => {
            return (
              <Accordion
                key={document.id}
                expanded={expandedAccordion === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{document.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <input
                    type='file'
                    ref={fileInputRef}
                    label='citizenship'
                    onChange={handleChangeImage}
                  />
                  <Button
                    variant='contained'
                    type='button'
                    onClick={() => {
                      handleFormSubmit(document.input);
                    }}
                  >
                    Upload
                  </Button>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDocumentDetailForm;
