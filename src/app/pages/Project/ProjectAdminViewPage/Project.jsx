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
  const { palette } = useContext(ThemeModeContext);

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
        }}
      >
        <Typography variant='h7' mb={1} fontWeight={500}>
          Filter By:
        </Typography>
        <Grid container spacing={4}>
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
                + Add Project
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
