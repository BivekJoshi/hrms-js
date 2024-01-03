import React, { useState } from "react";
import { useGetDeactivatedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { OfficeResourceLogisticsModal } from "./OfficeResourceModal";
import CustomTable from "../../../components/CustomTable/CustomTable";
import CloseIcon from "@mui/icons-material/Close";

const DeactivatedOfficeResource = ({ closeModal, title }) => {
  const { data, isLoading } = useGetDeactivatedOfficeResource();
  const [openModal, setopenModal] = useState(false);
  const [activateOfficeResource, setActivateOfficeResource] = useState({});
  const handleCloseActivatedModal = () => setopenModal(false);

  const handleActivate = (rowData) => {
    setActivateOfficeResource(rowData);
    setopenModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sorting: false,
    },
    {
      title: "Appliance Name",
      field: "name",
      render: (rowData) => (
        <Typography maxWidth="5rem" style={{ overflowWrap: "break-word" }}>
          {rowData.name}
        </Typography>
      ),
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Description",
      render: (rowData) => (
        <Typography maxWidth="10rem" style={{ overflowWrap: "break-word" }}>
          {rowData.description}
        </Typography>
      ),
      sorting: false,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleActivate(rowData)}>
            Activate
          </Button>
        </Stack>
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
        title=""
        isLoading={isLoading}
        exportButton={true}
        emptyRowsWhenPaging={true}
        // sorting={true}
        height={"320px"}
      />

      {openModal && (
        <OfficeResourceLogisticsModal
          title={"Activate Logistics"}
          id={activateOfficeResource?.id}
          open={openModal}
          handleCloseModal={handleCloseActivatedModal}
        />
      )}
    </>
  );
};

export default DeactivatedOfficeResource;
