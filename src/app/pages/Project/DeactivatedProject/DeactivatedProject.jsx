import MaterialTable from '@material-table/core';
import React, { useState } from 'react';
import {
  useAddActivateProject,
  useGetDeactivatedProject,
} from '../../../hooks/project/useProject';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { IconButton, Grid, Typography } from '@mui/material';
import {
  AddProjectActiveModal,
  AddProjectModal,
} from '../ProjectModal/ProjectModal';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import CloseIcon from '@mui/icons-material/Close';

const DeactivatedProject = ({onClick}) => {
  console.log(onClick);
  const { data: deactivatedProject, isLoading } = useGetDeactivatedProject();
  // const { data: employeeData } = useGetEmployee();

  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [activateProject, setActivateProject] = useState({});
  const handleCloseActivateModal = () => setOpenActivateModal(false);

  // const getLeaderName = (rowData) => {
  //   const projectId = rowData.projectLeaderId;
  //   const employee = employeeData?.find((emp) => emp.id === projectId);
  //   const name = `${employee?.firstName} ${employee?.middleName} ${employee?.lastName}`;
  //   return name;
  // };
 
  const handleActivateProject = (rowData) => {
    setActivateProject(rowData);
    setOpenActivateModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.index + 1,
      width: '2%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Project Name',
      field: 'projectName',
      emptyValue: '-',
    },
  ];

  const actions = [
    {
      icon: () => <RestoreFromTrashOutlinedIcon sx={{ color: "#01579B" }} />,
      tooltip: 'Activate Project',
      onClick: (event, rowData) => handleActivateProject(rowData),
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <div>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.2rem 0.6rem",
          }}
        >
          <Typography variant="h6"> Terminated project</Typography>

          <IconButton onClick={onClick}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </div>
      <br />
      <MaterialTable
        columns={columns}
        data={deactivatedProject}
        title='Inactive Projects'
        isLoading={isLoading}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#1c7ed6',
            color: '#FFF',
            fontSize: '1rem',
            padding: 'dense',
            height: 50,
          },
          rowStyle: {
            fontSize: '.8rem',
          },
        }}
        actions={actions}
      />

      {openActivateModal && (
        <AddProjectActiveModal
        title={'Activate Project'}
          id={activateProject?.id}
          open={openActivateModal}
          handleCloseModal={handleCloseActivateModal}
        />
      )}
    </>
  );
};

export default DeactivatedProject;
