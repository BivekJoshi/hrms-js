import React, { useState } from 'react';
import { useGetDeactivatedOfficeResource } from '../../../hooks/resource/officeResource/useOfficeResource';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { OfficeResourceLogisticsModal } from './OfficeResourceModal';
import CustomTable from '../../../components/CustomTable/CustomTable';
import AddTaskIcon from '@mui/icons-material/AddTask';
const DeactivatedOfficeResource = ({ closeModal, title }) => {
  const { data, isLoading } = useGetDeactivatedOfficeResource();
  const [openModal, setopenModal] = useState(false);
  const [activateOfficeResource, setActivateOfficeResource] = useState({});
  const handleCloseActivatedModal = () => setopenModal(false);

  const handleActivate = (rowData) => {
    setActivateOfficeResource(rowData);
    setopenModal(true);
  };

  const handleViewLog = (rowData) => {};

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: "8px",
      sorting: false,
    },
    {
      title: 'Appliance Name',
      field: 'name',
      render: (rowData) => (
        <div style={{ overflowWrap: 'break-word', width: '8rem' }}>
          {rowData?.name}
        </div>
      ),
      emptyValue: "-",
      width: "20px",
      sorting: false,
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "20px",
      sorting: false,
    },
    {
      title: "Description",
      width: "120px",
      render: (rowData) => (
        <Typography style={{ overflowWrap: "break-word", width: '280px' }}>
          {rowData?.description}
        </Typography>
      ),
      sorting: false,
    },
    {
      title: "Action",
      render: (rowData) => (
        <Tooltip title='Activate Logistic'>
          <IconButton onClick={() => handleActivate(rowData)}>
            <AddTaskIcon  sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }} />
          </IconButton>
        </Tooltip>
      ),
      sorting: false,
    },
  ];
  return (
    <>
      {/* <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0.2rem 0.6rem",
        }}
      >
        <Typography variant="h6"> {title} </Typography>
        <Typography onClick={closeModal} sx={{ cursor: "pointer" }}>
          {" "}
          <CloseIcon />{" "}
        </Typography>
      </Grid> */}

      <CustomTable
        columns={columns}
        data={data}
        title={title}
        isLoading={isLoading}
        emptyRowsWhenPaging={true}
        // sorting={true}
        height={'320px'}
        fileName="Inactive office resource"
        exportButton
        exportExcel
        pdfNone
      />

      {openModal && (
        <OfficeResourceLogisticsModal
          title={'Activate Logistics'}
          id={activateOfficeResource?.id}
          open={openModal}
          handleCloseModal={handleCloseActivatedModal}
        />
      )}
    </>
  );
};

export default DeactivatedOfficeResource;
