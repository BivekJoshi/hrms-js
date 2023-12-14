import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';

import EmployeeTable from './EmployeeView/EmployeeTable';
import EmployeeBasicInfoForm from '../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm';
import useAddEmployeeForm from '../../hooks/employee/AddEmployee/useAddEmployeeForm';
import EmployeeGrid from './EmployeeView/EmployeeGrid';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/Button/ButtonComponent';
import './Style/Style.css';
import ThemeModeContext from '../../../theme/ThemeModeContext';

const Employee = () => {
  const { mode } = React.useContext(ThemeModeContext);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #808080',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    background: mode === 'light' ? '' : '#413e3e',
  };

  const navigate = useNavigate();

  const [value, setValue] = React.useState('1');

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);

  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const handleOpenSubmitModal = () => setOpenSubmitModal(true);

  const { formik, data } = useAddEmployeeForm(handleOpenSubmitModal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
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
              <Tab label='Grid View' value='1' />
              <Tab label='Table View' value='2' />
            </TabList>
            <ButtonGroup
              variant='contained'
              sx={{ gap: '12px', textDecoration: 'none', boxShadow: '0' }}
            >
              <ButtonComponent
                NameClass='buttonGroup'
                OnClick={() => {
                  navigate('deactivated');
                }}
                buttonName='Inactive Employee'
                BGColor='white'
                TextColor='black'
              />
              <ButtonComponent
                color='white'
                OnClick={handleAddOpenModal}
                buttonName='+Add Employee'
              />
            </ButtonGroup>
          </Box>
          <TabPanel value='1'>
            <EmployeeGrid />
          </TabPanel>
          <TabPanel value='2'>
            <EmployeeTable />
          </TabPanel>
        </Box>
      </TabContext>

      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div>
          <Box sx={style}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                position: 'relative',
              }}
            >
              <Typography variant='h6'>Add Employee</Typography>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  position: 'absolute',
                  bottom: '0',
                }}
              />
              <IconButton onClick={() => setOpenAddModal(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <EmployeeBasicInfoForm formik={formik} />
            <Divider style={{ paddingTop: '16px' }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                paddingTop: '16px',
              }}
            >
              <ButtonComponent buttonName={'submit'} OnClick={handleSubmit} />
              <ButtonComponent
                buttonName={'Cancel'}
                OnClick={() => {
                  setOpenAddModal(false);
                }}
                BGColor='red'
              />
            </Box>
          </Box>
        </div>
      </Modal>

      <Modal
        open={openSubmitModal}
        onClose={() => setOpenSubmitModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <Box sx={style}>
            <Typography variant='h6'>
              Do you like to add more Details of this Employee??
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                style={{ marginTop: '10px' }}
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  navigate(`edit/${data?.id}`);
                }}
              >
                Yes
              </Button>
              <Button
                variant='contained'
                style={{ marginTop: '10px' }}
                onClick={() => {
                  setOpenSubmitModal(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color='error'
              >
                No
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default Employee;
