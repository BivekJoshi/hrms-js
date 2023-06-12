import React from 'react'
// material-ui
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// =========== Loader ==================== //

const Loader = () => (
  <LoaderWrapper>
    <CircularProgress color="primary"/>
  </LoaderWrapper>
);

export default Loader;
