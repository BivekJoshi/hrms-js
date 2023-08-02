import * as React from 'react';
import { useState } from 'react';
import { Box, Button, ButtonGroup, Modal } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import EmployeeTable from './EmployeeView/EmployeeTable';
import EmployeeBasicInfoForm from '../../components/Form/Employee/EmployeeBasicInfoForm/EmployeeBasicInfoForm';
import useAddEmployeeForm from '../../hooks/employee/AddEmployee/useAddEmployeeForm';
import EmployeeGrid from './EmployeeView/EmployeeGrid';
import { useNavigate } from 'react-router-dom';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #808080",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Employee = () => {
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
    if (formik.isValid) {
      setOpenAddModal(false)
    } else {
      toast.error('Please make sure you have filled the form correctly');
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
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Grid View" value="1" />
              <Tab label="Table View" value="2" />
            </TabList>
            <ButtonGroup variant="contained" sx={{gap: "12px"}}>
            <Button onClick={() => {navigate("deactivated")}}>Inactive Employee</Button>
              <Button onClick={handleAddOpenModal}>+Add Employee</Button>
            </ButtonGroup>
          </Box>
          <TabPanel value="1">
            <EmployeeGrid />
          </TabPanel>
          <TabPanel value="2">
            <EmployeeTable />
          </TabPanel>
        </Box>
      </TabContext>

      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <EmployeeBasicInfoForm formik={formik} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setOpenAddModal(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>

      <Modal
        open={openSubmitModal}
        onClose={() => setOpenSubmitModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <h3>Do you like to add more Details of this Employee??</h3>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  navigate(`edit/${data?.id}`);
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setOpenSubmitModal(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color="error"
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