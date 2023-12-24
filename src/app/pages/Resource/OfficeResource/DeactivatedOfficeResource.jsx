import React, { useState } from "react";
import { useGetDeactivatedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Button, Stack } from "@mui/material";
import { OfficeResourceLogisticsModal } from "./OfficeResourceModal";
import CustomTable from "../../../components/CustomTable/CustomTable";

const DeactivatedOfficeResource = () => {
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
      field: "description",
      emptyValue: "-",
      width: "57rem",
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
      <CustomTable
        columns={columns}
        data={data}
        title="Deactivated Logistics"
        isLoading={isLoading}
        exportButton={true}
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
