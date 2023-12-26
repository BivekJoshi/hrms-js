import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
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

import EmployeeBasicInfoForm from '../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm';
import useAddEmployeeForm from '../../hooks/employee/AddEmployee/useAddEmployeeForm';
import EmployeeGrid from './EmployeeView/EmployeeGrid';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/Button/ButtonComponent';
import './Style/Style.css';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import { useGetEmployee } from '../../hooks/employee/useEmployee';
import EmployeeTableView from './EmployeeView/EmployeePage/EmployeeTableView';

const Employee = () => {
  const { mode } = React.useContext(ThemeModeContext);
  const { data: employeeData, isLoading } = useGetEmployee();

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
  const handleAddCloseModal = () => setOpenAddModal(false);

  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const handleOpenSubmitModal = () => setOpenAddModal(false);
  const handleCloseEmailModal = () => {
    setOpenAddModal(false);
    setOpenSubmitModal(false);
  }

  const { formik } = useAddEmployeeForm(handleOpenSubmitModal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
    if(formik.isValid) {
    }
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
            <Box sx={{ display: 'flex', gap: '12px' }}>
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('deactivated');
                }}
                sx={{ textTransform: 'none' }}
              >
                Inactive Employee
              </Button>
              <Button
                variant='contained'
                onClick={handleAddOpenModal}
                sx={{ textTransform: 'none', color: '#fff' }}
              >
                +Add Employee
              </Button>
            </Box>
          </Box>
          <TabPanel value='1'>
            <EmployeeGrid employeeData={employeeData} isLoading={isLoading} />
          </TabPanel>
          <TabPanel value='2'>
            {/* <EmployeeTable /> */}
            <EmployeeTableView
              employeeData={employeeData}
              isLoading={isLoading}
            />
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
              <Typography variant='h6' sx={{color: mode === 'light' ? '#000' : '#fff'}}>Add Employee</Typography>
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
              <Button
                variant='contained'
                color='success'
                onClick={handleSubmit}
                sx={{ textTransform: 'none', color: mode === 'light' ? '#fff' : '#fff' }}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  setOpenAddModal(false);
                }}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
{/* 
      <Modal
        open={openSubmitModal}
        onClose={handleCloseEmailModal}
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
                onClick={handleCloseEmailModal}
                sx={{ mt: 3, ml: 1 }}
                color='error'
              >
                No
              </Button>
            </Box>
          </Box>
        </div>
      </Modal> */}
    </>
  );
};

export default Employee;
