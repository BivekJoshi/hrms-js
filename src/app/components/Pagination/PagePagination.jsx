import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PagePagination = ({Count, Page, OnChange, OnPageChange}) => {
  
    return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={Count}
        color="primary" 
        page={Page} 
        onChange={OnChange}
        onPageChange={OnPageChange}
      />
    </Stack>
  );
}