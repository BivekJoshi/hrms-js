import React from 'react';
import { styled } from '@mui/material/styles';
import './loading.css';

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const Loader = () => (
  <LoaderWrapper>
    <span className='loader'></span>
  </LoaderWrapper>
);

export default Loader;
