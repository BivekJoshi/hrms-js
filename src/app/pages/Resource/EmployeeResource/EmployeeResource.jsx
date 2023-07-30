import { Box, Button, Stack } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { useDeleteEmployeeResource, useGetEmployeeResource } from "../../../hooks/resource/employeeResource/useEmployeeResource";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { AddEmployeeResourceModal } from "./EmployeeResourceModal";
import { useGetOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";

const EmployeeResource = () => {
  const navigate = useNavigate();
  const { data: employeeResourceData, isLoading } = useGetEmployeeResource();
  const { data : officeResourceData } = useGetOfficeResource();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletedData, setDeletedData] = useState({});
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteRowDataMutation = useDeleteEmployeeResource({});
  const handleDeleteRowData = (rowData) => {
    setDeletedData(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRowDataMutation.mutate(deletedData.id);
    setOpenDeleteModal(false);
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);




  const getEmployeeName = (rowData) => {
    const employeeId = rowData?.employeeId;
    const employee = employeeData?.find((emp) => emp?.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName
    }`;
    return name;
  };

  const getResourceName = (rowData) => {
    const resourceId = rowData?.officeResourceId;
    const resourceName = officeResourceData?.find((resource) => resource?.id === resourceId );
    return resourceName?.name;
  }


  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
    },
    {
      title: "Employee Name",
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)} </p>;
      },
      width: 120,
    },
    {
      title: "Resource",
      render: (rowData) => {
        return <p>{getResourceName(rowData)}</p>
      },
      width: "20vh",
    },
    {
      title: "Receive Date",
      field: "receiveDate",
      emptyValue: "-",
    },
    {
      title: "Return Date",
      field: "returnDate",
      emptyValue: "-",
    },
    {
      title: 'Actions',
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleDeleteRowData(rowData)}>
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 120,
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => {
            navigate(`/admin/resource/office`);
          }}
        >
          Resources
        </Button>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
          +Add Employee
        </Button>
      </Box>
      <br></br>

      <MaterialTable
        icons={tableIcons}
        title="Employee Resource"
        columns={columns}
        data={employeeResourceData}
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
        {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Employee with Resource"}
        />
      )}
        {openAddModal && (
        <AddEmployeeResourceModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default EmployeeResource;
