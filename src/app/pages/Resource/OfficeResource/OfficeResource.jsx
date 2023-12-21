import React, { useState } from "react";
import { useEditActiveInactiveOfficeResource, useGetAvailableOfficeResource, useGetUsedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box } from "@mui/material";
import {
  AddOfficeResourceModal,
  EditOfficeResourceModal,
} from "./OfficeResourceModal";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import DeactivatedOfficeResource from "./DeactivatedOfficeResource";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AvailableOfficeLogistic } from "./AvailableOfficeLogistic";
import { OpenCLoseModel } from "./OpenCLoseModel";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";
import CustomTable from "../../../components/CustomTable/CustomTable";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HocButton from '../../../hoc/hocButton';
import PermissionHoc from '../../../hoc/permissionHoc';
import DeleteConfirmationModal from '../../../components/Modal/DeleteConfirmationModal';

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
    const data = {...rowData, isActive: false};
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
    const name = `${employee?.firstName} ${employee?.middleName || ''} ${
      employee?.lastName
    }`;
    return name;
  };
  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sorting: false,
    },
    {
      title: "Resource Name",
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
  ];

  const actions = [
    {
      icon: () => (
        <HocButton
          permissions={permissions?.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: 'Edit Logistics',
      onClick: (event, rowData) => handleEditRowData(rowData),
    },
    {
      icon: () => (
        <HocButton permissions={permissions.canDelete} icon={<DeleteIcon />} />
      ),
      tooltip: "Delete Department",
      onClick: (event, rowData) => handleDeleteRowData(rowData),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          padding: '.5rem 0',
        }}
      >
        <ButtonComponent
          OnClick={handleOpenModal}
          buttonName={'Deactivated Logistics'}
          // buttonName={
          //   <DeleteForeverIcon sx={{ width: '1rem', height: '1rem' }} />
          // }
          BGColor='white'
          TextColor='black'
        />
        {/* <ButtonComponent
          OnClick={handleOpenAvailableModal}
          buttonName={'Available Logistics'}
          BGColor='white'
          TextColor='black'
        /> */}
        <ButtonComponent
          color='white'
          OnClick={handleAddOpenModal}
          buttonName={'+Add Office Logistics'}
        />
      </Box>
      <br />
      <br />
      <CustomTable
        columns={columns}
        data={availableOfficeResource}
        title="Available Logistics"
        isLoading={isLoading}
        exportButton={true}
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
      <OpenCLoseModel
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        modelName={<DeactivatedOfficeResource />}
        setOpenModal={setOpenModal}
      />
      {/* <OpenCLoseModel
        openModal={openNotUseModal}
        handleCloseModal={handleCloseAvailableModal}
        modelName={<AvailableOfficeLogistic />}
        setOpenModal={setOpenNotUseModal}
      /> */}
       {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Resource"}
        />
      )}
    </>
  );
};

export default PermissionHoc(OfficeResource);
