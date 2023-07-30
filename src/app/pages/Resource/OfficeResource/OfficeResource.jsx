import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box, Button } from "@mui/material";
import { AddOfficeResourceModal } from "./OfficeResourceModal";

const OfficeResource = () => {
  const { data: officeResourceData, isLoading } = useGetOfficeResource();

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData?.tableData?.index+1,
      width: "3%",
      sortable: false,
    },
    {
      title: "Appliance Name",
      field: "name",
      emptyValue: "-",
      width: "40vh",
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
    },
    {
      title: "Description",
      field: "description",
      emptyValue: "-",
    },
    {
      title: "Status",
      field: "isActive",
      emptyValue: "-",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          +Add Office Resource
        </Button>
      </Box>
      <br />
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Office Resource"
        columns={columns}
        data={officeResourceData}
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: 20,
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
      />
      {openAddModal && (
        <AddOfficeResourceModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default OfficeResource;
