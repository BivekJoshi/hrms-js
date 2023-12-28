import MaterialTable from '@material-table/core';
import React, { useState } from 'react';
import {
  useAddActivateProject,
  useGetDeactivatedProject,
} from '../../../hooks/project/useProject';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import { Button, Stack } from '@mui/material';
import { AddProjectActiveModal } from '../ProjectModal/ProjectModal';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const DeactivatedProject = () => {
  const { data: deactivatedProject, isLoading } = useGetDeactivatedProject();
  const { data: employeeData } = useGetEmployee();

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
      render: (rowData) => rowData.tableData.id + 1,
      width: '2%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Project Name',
      field: 'projectName',
      emptyValue: '-',
    },
    // {
    //   title: 'Project Leader Name',
    //   render: (rowData) => {
    //     return <p>{getLeaderName(rowData)}</p>;
    //   },
    // },
  ];

  const actions = [
    {
      icon: () => <RestoreFromTrashOutlinedIcon sx={{ color: '#01579B' }} />,
      tooltip: 'Activate Project',
      onClick: (event, rowData) => handleActivateProject(rowData),
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
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
          id={activateProject?.id}
          open={openActivateModal}
          handleCloseModal={handleCloseActivateModal}
        />
      )}
    </>
  );
};

export default DeactivatedProject;
