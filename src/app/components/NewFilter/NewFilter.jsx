import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import './NewFilter.css';
import { Field, Form, Formik } from 'formik';

const NewFilter = ({ inputField, searchCallBack, validate }) => {
  const [showFilter, setShowFilter] = useState(true);

  const initialValues = inputField.reduce((acc, item) => {
    acc[item.name] = '';
    return acc;
  }, {});

  const handleFilterButtonClick = () => {
    setShowFilter((val) => !val);
  };

  const handleSearch = (values) => {
    if (Object.keys(values).length > 0) {
      searchCallBack(values);
    }
  };

  const getComponentToRender = (element, setFieldValue, formikProps) => {
    switch (element?.type) {
      case 'autoComplete':
        return (
          <Autocomplete
            name={element?.name}
            getOptionLabel={(option) => option.label}
            options={element?.options}
            renderInput={(params) => (
              <TextField
                {...params}
                label={element?.label}
                name={element?.name}
                placeholder={element?.placeholder}
                required={element?.required}
              />
            )}
            onChange={(e, value) => setFieldValue(element.name, value.id)}
          />
        );
      case 'autoCompleteLabel':
        return (
          <Autocomplete
            name={element?.name}
            getOptionLabel={(option) => option.label}
            options={element?.options}
            renderInput={(params) => (
              <TextField
                {...params}
                label={element?.label}
                name={element?.name}
                placeholder={element?.placeholder}
              />
            )}
            onChange={(e, value) => setFieldValue(element.name, value.label)}
          />
        );
      case 'dropDownId':
        return (
          <>
            <FormControl fullWidth>
              <InputLabel>{element.label}</InputLabel>
              <Field as={Select} name={element?.name} label={element.label}>
                {element?.dropDownData?.map((d, index) => (
                  <MenuItem key={d + index} value={d.id}>
                    {d.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </>
        );
      default:
        return (
          <TextField
            name={element?.name}
            label={element?.label}
            fullWidth
            onChange={(e, value) => setFieldValue(element.name, e.target.value)}
          />
        );
    }
  };
  const handleClear = () => {
    // formik.resetForm();
  };

  return (
    <Box
      sx={{
        marginBottom: '16px',
        padding: ' 16px',
        borderRadius: '6px',
        backgroundColor: '#fafafa',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <div className='filterButton' onClick={handleFilterButtonClick}>
          <Typography>Filter</Typography>
          <svg
            width='17'
            height='18'
            viewBox='0 0 17 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_898_4525)'>
              <path
                d='M6.44638 15.2161L8.08621 16.4364C8.34045 16.6652 8.65825 16.7796 9.0396 16.7796C9.19215 16.7796 9.44638 16.7288 9.80232 16.6271C10.3871 16.322 10.6794 15.8262 10.6794 15.1398V9.38133L15.9803 2.78387C16.4125 2.24997 16.4633 1.67794 16.1328 1.06777C15.7515 0.432177 15.2684 0.11438 14.6837 0.11438H1.79384C1.05655 0.11438 0.573503 0.406753 0.344689 0.991499C0.090452 1.65252 0.141299 2.22455 0.497232 2.7076L5.79808 9.38133V13.9195C5.79808 14.4788 6.01418 14.911 6.44638 15.2161ZM1.79384 1.71607H14.6837L9.0396 8.73302V15.1398L7.43791 13.9195V8.73302L1.79384 1.71607Z'
                fill='#1E1E1E'
              />
            </g>
            <defs>
              <clipPath id='clip0_898_4525'>
                <rect width='16.4775' height='18' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Grid>
      {showFilter && (
        <div style={{ paddingTop: '16px' }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSearch(values)}
          >
            {({ setFieldValue, ...formikProps }) => {
              return (
                <Form>
                  <Grid container spacing={2} alignItems={'center'}>
                    {inputField?.map((element, index) => {
                      return (
                        <Grid
                          item
                          sm={element?.sm}
                          xs={element?.xs || element?.sm}
                          md={element?.md}
                          key={index}
                        >
                          {getComponentToRender(
                            element,
                            setFieldValue,
                            formikProps
                          )}
                        </Grid>
                      );
                    })}
                  </Grid>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      variant='outlined'
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        mx: 1,
                      }}
                      color='error'
                      onClick={() => handleClear()}
                    >
                      Clear
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </Box>
  );
};

export default NewFilter;
