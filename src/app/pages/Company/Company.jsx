<<<<<<< HEAD
import * as React from "react";
import { useState } from "react";
import MaterialTable from "@material-table/core";
import { Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import {
  useDeleteCompany,
  useGetCompany,
} from "../../hooks/company/useCompany";
import { AddCompanyModal, EditCompanyModal } from "./CompanyModal/CompanyModal";
=======
import * as React from 'react';
import { Box, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AddCompanyModal } from './CompanyModal/CompanyModal';
import { useState } from 'react';
import CompanyTable from './CompanyModal/CompanyTable';
import CompanyGrid from './CompanyModal/CompanyGrid';
>>>>>>> de5fb2309e6119aecbb045af3934adb3bb21dbbe

const Company = () => {
  const [value, setValue] = React.useState('1');

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

<<<<<<< HEAD
  const handleCloseEditModal = () => setOpenEditModal(false);

  const deleteCompanyMutation = useDeleteCompany({});
  const handleDeleteCompany = (companyId) => {
    deleteCompanyMutation.mutate(companyId);
  };

  const handleEditCompany = (rowData) => {
    setEditedCompany(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      width: 100,
    },
    {
      title: "Company Name",
      field: "companyName",
      emptyValue: "-",
      width: 300,
    },
    {
      title: "Company Type",
      field: "companyType",
      emptyValue: "-",
      width: 340,
    },
    {
      title: "Description",
      field: "companyDescription",
      emptyValue: "-",
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleEditCompany(rowData)}>
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => handleDeleteCompany(rowData.id)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 120,
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          +Add Company
        </Button>
      </Box>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={companyData}
        title=""
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
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
      {openEditModal && (
        <EditCompanyModal
          id={editedCompany?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
=======
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              <Tab label="Table View" value="1" />
              <Tab label="Grid View" value="2" />
            </TabList>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleAddOpenModal}
            >
              +Add Company
            </Button>
          </Box>
          <TabPanel value="1">
            <CompanyTable />
          </TabPanel>
          <TabPanel value="2">
            <CompanyGrid />
          </TabPanel>
        </Box>
      </TabContext>
>>>>>>> de5fb2309e6119aecbb045af3934adb3bb21dbbe
      {openAddModal && (
        <AddCompanyModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default Company;
