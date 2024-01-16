import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Stack,
  TextField,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  useGetProject,
  useGetProjectDetail,
  useGetProjectPageWise,
} from '../../../hooks/project/useProject';
import { AddProjectModal } from '../ProjectModal/ProjectModal';

import ProjectCard from '../../../components/cards/Employee/ProjectCard';
import HocButton from '../../../hoc/hocButton';
import PermissionHoc from '../../../hoc/permissionHoc';
import useAuth from '../../../../auth/hooks/component/login/useAuth';
import DeactivatedProject from '../DeactivatedProject/DeactivatedProject';
import { ButtonComponent } from '../../../components/Button/ButtonComponent';
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const Project = ({ permissions }) => {
  // State and hooks
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [nameFilter, setNameFilter] = useState('');
  const [leaderNameFilter, setLeaderNameFilter] = useState('');
  const { isEmployee } = useAuth();
  const { mode, palette } = useContext(ThemeModeContext);

  const [openModal, setOpenModal] = useState(false);
  const { data: projectDetail, isLoading } = useGetProjectPageWise(
    pageNumber,
    pageSize
  );

  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Function to handle opening/closing filter container
  const handleFilterIconClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  // Functions to handle opening/closing add project modal
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Functions to handle opening/closing terminated project modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle page change and page size change
  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage - 1);
    window.scroll(0, 0);
  };

  const handlePageSizeChange = (event, newValue) => {
    const newPageSize = parseInt(newValue, 6) || 0;
    setPageSize(newPageSize);
    setPageNumber(0);
  };

  // Filter projects based on name and leader name
  const filteredProjects = projectDetail?.projectResList?.filter(
    (project) =>
      `${project.projectName}`
        ?.toLowerCase()
        ?.includes(nameFilter.toLowerCase()) &&
      project?.projectLeadName
        ?.toLowerCase()
        ?.includes(leaderNameFilter.toLowerCase())
  );
  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          padding: '16px',
          borderRadius: '6px',
          marginBottom: '16px',
          backgroundColor: palette?.background?.default,
          gap: '2rem',
          justifyContent: 'end',
        }}
      >
        <Typography
          border='1px solid white'
          padding='.5rem 1rem '
          display='flex'
          gap='3px'
          alignItems='center'
        >
          Filter
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
                fill={mode === 'dark' ? '#fff' : '#1E1E1E'}
              />
            </g>
            <defs>
              <clipPath id='clip0_898_4525'>
                <rect width='16.4775' height='18' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </Typography>
        <Grid container spacing={4} marginBottom='2rem'>
          <Grid item xs={4}>
            <TextField
              label='Filter by Project Name'
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={4}>
            {' '}
            <TextField
              label='Filter by Project Leader Name'
              value={leaderNameFilter}
              onChange={(e) => setLeaderNameFilter(e.target.value)}
              fullWidth
              size='small'
            />
          </Grid>
        </Grid>
      </Grid>

      <Box>
        <Typography
          className='project-button'
          variant='h5'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1.2rem',
          }}
        >
          On-Going Projects
          {isEmployee ? null : (
            <Box sx={{ display: 'flex', gap: '12px' }}>
              <Button
                variant='outlined'
                onClick={handleOpenModal}
                sx={{ textTransform: 'none' }}
              >
                Terminated Project{' '}
              </Button>
              <Button
                variant='contained'
                onClick={handleAddOpenModal}
                sx={{ textTransform: 'none', color: '#fff' }}
              >
                Add Project
              </Button>
            </Box>
          )}
        </Typography>
      </Box>

      {/* Project filter container */}
      <br />
      <Grid
        container
        item
        gap={3}
        className='project-card-control'
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        }}
      >
        {/* Mapping over filtered projects to display project cards */}
        {filteredProjects?.map((item, index) => (
          <ProjectCard
            item={item}
            Id={item?.projectid}
            key={index}
            ProjectName={item?.projectName}
            StartDate={item?.startDate}
            EndDate={item?.endDate}
            ProjectLeaderId={item?.projectLeadName}
            TaskStatus={item?.taskStatus}
            totalEmployee={item?.totalEmployee}
          />
        ))}
      </Grid>

      <Box mt={4} display='flex' justifyContent={'end'}>
        <Pagination
          count={projectDetail?.totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
          boundaryCount={3}
          showFirstButton
          showLastButton
          // size="large"
          color='primary'
        />
        {/* <Autocomplete
          value={pageSize}
          onChange={handlePageSizeChange}
          options={[5, 10, 15, 20, 25, 30]}
          renderInput={(params) => (
            <TextField
              {...params}
              label='page'
              variant='outlined'
              size='small'
            />
          )}
        /> */}
      </Box>

      {/* Add project modal */}
      {openAddModal && (
        <AddProjectModal
          title={'Add Project'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}

      {/* Terminated project modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* DeactivatedProject component to display terminated projects */}
          <DeactivatedProject onClick={() => setOpenModal(false)} />
          <br />
          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            {/* <IconButton onClick={() => setOpenModal(false)}><CloseIcon /></IconButton> */}
            <Button
              onClick={() => setOpenModal(false)}
              color='error'
              variant='contained'
              sx={{ textTransform: 'capitalize' }}
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default PermissionHoc(Project);
