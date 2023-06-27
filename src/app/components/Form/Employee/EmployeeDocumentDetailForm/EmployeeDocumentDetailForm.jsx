import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

const EmployeeDocumentDetailForm = () => {
  const fileInputRef = useRef(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
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
          <Accordion
            expanded={expandedAccordion === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Employee Photo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <input
                type='file'
                ref={fileInputRef}
                label='citizenship'
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                type='button'
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Upload
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Citizenship</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <input
                type='file'
                ref={fileInputRef}
                label='citizenship'
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                type='button'
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Upload
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>Curriculum Vitae</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <input
                type='file'
                ref={fileInputRef}
                label='citizenship'
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                type='button'
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Upload
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              aria-controls='panel4a-content'
              id='panel4a-header'
            >
              <Typography>PAN Card</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <input
                type='file'
                ref={fileInputRef}
                label='citizenship'
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                type='button'
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Upload
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === 'panel5'}
            onChange={handleChange('panel5')}
          >
            <AccordionSummary
              aria-controls='panel5a-content'
              id='panel5a-header'
            >
              <Typography>Academic Document</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <input
                type='file'
                ref={fileInputRef}
                label='citizenship'
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                type='button'
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Upload
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDocumentDetailForm;
