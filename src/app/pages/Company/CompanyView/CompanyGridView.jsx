import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import CompanyGrid from '../../../../assets/companyGrid.png';

const CompanyGridView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const { palette } = useContext(ThemeModeContext); // Accessing mode from context

  return (
    <>
      <Grid container spacing={2}>
        {companyData.map((item, index) => (
          <Grid
            key={index}
            item
            xs={4}
            sx={{ maxHeight: '400px', minWidth: '400px' }}
          >
            <Card>
              <Box
                sx={{
                  backgroundColor: palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <img
                  src={CompanyGrid}
                  style={{ position: 'absolute', right: 0 }}
                />
                <Typography
                  variant='h5'
                  sx={{ color: '#fff', fontWeight: '700px', padding: '15px' }}
                >
                  {item?.companyName}
                </Typography>
              </Box>
              <CardContent sx={{ overflowY: 'scroll', maxHeight: '260px' }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {item?.companyType || null}
                </Typography>
                <br />
                <Typography
                  variant='p'
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {item?.companyDescription || null}
                </Typography>
                <br />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() => handleEditCompany(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleDeleteCompany(item)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CompanyGridView;
