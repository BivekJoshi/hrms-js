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
import PermissionHoc from '../../hoc/permissionHoc';
import HocButton from '../../hoc/hocButton';
import { useGetUserRole } from '../../hooks/auth/userControl/useUserControl';
import { useGetCompany } from '../../hooks/company/useCompany';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const Company = ({ permissions }) => {
  const [value, setValue] = React.useState('1');
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { palette, mode } = React.useContext(ThemeModeContext);
  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: '.5rem',
    textTransform: 'none',
    borderRadius: '.5rem',
    color: mode === 'light' ? 'black' : 'white',
    textDecoder: 'none',
    // fontWeight: "bold",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === 'dark' ? palette.text.primary : palette.secondary.light,
    borderBottom: 'none',
    textDecoder: 'none',
    color: mode === 'dark' ? 'black' : 'white',

    // fontWeight: "bold",
  };
  const { data: companyData, isLoading } = useGetCompany();

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
            }}
          >
            <TabList onChange={handleChange} indicatorColor='none'>
              <Tab
                label='Table View'
                value='1'
                style={value === '1' ? activeLabelStyle : labelStyle}
              />
              <Tab
                label='Grid View'
                value='2'
                style={value === '2' ? activeLabelStyle : labelStyle}
              />
            </TabList>

            <HocButton
              permissions={permissions?.canAdd}
              color={'white'}
              variant={'contained'}
              onClick={handleAddOpenModal}
              buttonName={'Add Branch'}
            />
          </Box>
          <TabPanel value='1' sx={{ padding: '0' }}>
            <br />
            <CompanyTable
              permissions={permissions}
              companyData={companyData}
              isLoading={isLoading}
            />
          </TabPanel>
          <TabPanel value='2'>
            <br />
            <CompanyGrid
              permissions={permissions}
              companyData={companyData}
              isLoading={isLoading}
            />
          </TabPanel>
        </Box>
      </TabContext>
      {openAddModal && (
        <AddCompanyModal
          title={'Add Branch'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(Company);
