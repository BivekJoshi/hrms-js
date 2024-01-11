import React, { useState } from "react";
import {
  useEditActiveInactiveOfficeResource,
  useGetAvailableOfficeResource,
  useGetUsedOfficeResource,
} from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box, Button, Typography } from "@mui/material";
import {
  AddOfficeResourceModal,
  DeactivatedOfficeResourceModal,
  EditOfficeResourceModal,
} from './OfficeResourceModal';
import { ButtonComponent } from '../../../components/Button/ButtonComponent';
import DeactivatedOfficeResource from './DeactivatedOfficeResource';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AvailableOfficeLogistic } from './AvailableOfficeLogistic';
import { OpenCLoseModel } from './OpenCLoseModel';
import { useGetEmployee } from '../../../hooks/employee/useEmployee';
import CustomTable from '../../../components/CustomTable/CustomTable';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import HocButton from '../../../hoc/hocButton';
import PermissionHoc from '../../../hoc/permissionHoc';
import DeleteConfirmationModal from '../../../components/Modal/DeleteConfirmationModal';
import ThemeModeContext from '../../../../theme/ThemeModeContext';

const OfficeResource = ({ permissions }) => {
  const { data: officeResourceData, isLoading } = useGetUsedOfficeResource();
  const { data: availableOfficeResource } = useGetAvailableOfficeResource();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNotUseModal, setOpenNotUseModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState({});
  const [deletedResource, setDeletedResource] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleEditRowData = (rowData) => {
    setEditedRowData(rowData);
    setOpenEditModal(true);
  };

  const deleteResourceMutation = useEditActiveInactiveOfficeResource({});
  const handleDeleteRowData = (rowData) => {
    const data = { ...rowData, isActive: false };
    setDeletedResource(data);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteResourceMutation.mutate(deletedResource);
    setOpenDeleteModal(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenAvailableModal = () => setOpenNotUseModal(true);
  const handleCloseAvailableModal = () => setOpenNotUseModal(false);

  const getEmployeeName = (rowData) => {
    const employeeId = rowData?.employeeId;
    const employee = employeeData?.find((emp) => emp?.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ""} ${
      employee?.lastName
    }`;
    return name;
  };
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "2rem",
      sorting: false,
    },
    {
      title: "Resource Name",
      field: "name",
      render: (rowData) => (
        <Typography style={{ overflowWrap: "break-word", width: "15rem" }}>
          {rowData?.name}
        </Typography>
      ),
      emptyValue: "-",
      width: "12rem",
      sorting: false,
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "12rem",
      sorting: false,
    },
    {
      title: "Description",
      field: "description",
      render: (rowData) => (
        <Typography style={{ overflowWrap: "break-word", width: "30rem" }}>
          {rowData?.description}
        </Typography>
      ),
      emptyValue: "-",
      width: "18rem",
      sorting: false,
    },
  ];
  const { mode } = React.useContext(ThemeModeContext);

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      disabled: !permissions?.canEdit,
      tooltip: "Edit Logistics",
      onClick: (event, rowData) => handleEditRowData(rowData),
    },
    {
      icon: () => (
        <HighlightOffOutlinedIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "red",
            },
          }}
        />
      ),
      disabled: !permissions?.canDelete,
      tooltip: "Inactivate Logistics",
      onClick: (event, rowData) => handleDeleteRowData(rowData),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: ".5rem 0",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleOpenModal}
          sx={{ textTransform: "none" }}
        >
          Deactivated Logistics
        </Button>
        <Button
          variant="contained"
          onClick={handleAddOpenModal}
          sx={{ textTransform: "none" }}
        >
          Add Office Logistics
        </Button>
      </Box>

      <CustomTable
        columns={columns}
        data={availableOfficeResource}
        title="Available Logistics"
        isLoading={isLoading}
        // exportButton={true}
        actions={actions}
      />
      {openAddModal && (
        <AddOfficeResourceModal
          title={"Add Logistics"}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditOfficeResourceModal
          title={"Edit Logistics"}
          data={editedRowData}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openModal && (
        <DeactivatedOfficeResourceModal
          width={"fit-content"}
          open={openModal}
          handleCloseModal={handleCloseModal}
          title={"Deactivated Logistics"}
        />
      )}

      {openDeleteModal && (
        <FormModal
          title={"Deactivate Logistics"}
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          formComponent={
            <div>
              <Typography>
                Are u sure you want to inactivate the logistics?
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  justifyContent: "flex-end",
                  margin:".5rem"
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleConfirmDelete}
                >
                  Yes Proceed
                </Button>
                <Button
                  onClick={handleCloseDeleteModal}
                  variant="contained"
                  color="error"
                >
                  Close
                </Button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default PermissionHoc(OfficeResource);
