import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const EmployeeDocumentDetailForm = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div
            style={{ display: 'flex', marginLeft: '5%', marginTop: '2%' }}
          ></div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Accordion>
            <AccordionSummary 
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Accordian 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                type='file'
                label='citizenship'
                InputLabelProps={{ shrink: 'true' }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDocumentDetailForm;
