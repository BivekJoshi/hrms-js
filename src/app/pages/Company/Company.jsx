import * as React from 'react';
import { Box, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AddCompanyModal } from './CompanyModal/CompanyModal';
import { useState } from 'react';
import CompanyTable from './CompanyModal/CompanyTable';
import CompanyGrid from './CompanyModal/CompanyGrid';

const Company = () => {
  const [value, setValue] = React.useState('1');

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Table View' value='1' />
              <Tab label='Grid View' value='2' />
            </TabList>
            <Button
              variant='contained'
              sx={{ mt: 3, ml: 1 }}
              onClick={handleAddOpenModal}
            >
              +Add Company
            </Button>
          </Box>
          <TabPanel value='1' sx={{ padding: '0' }}>
            <br />
            <CompanyTable />
          </TabPanel>
          <TabPanel value='2'>
            <br />
            <CompanyGrid />
          </TabPanel>
        </Box>
      </TabContext>
      {openAddModal && (
        <AddCompanyModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default Company;
