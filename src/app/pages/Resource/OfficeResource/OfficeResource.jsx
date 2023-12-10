import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetUsedOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box } from "@mui/material";
import {
  AddOfficeResourceModal,
  EditOfficeResourceModal,
} from "./OfficeResourceModal";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import DeactivatedOfficeResource from "./DeactivatedOfficeResource";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AvailableOfficeLogistic } from "./AvailableOfficeLogistic";
import { OpenCLoseModel } from "./OpenCLoseModel";
import { useGetEmployee } from "../../../hooks/employee/useEmployee";

const OfficeResource = () => {
  const { data: officeResourceData, isLoading } = useGetUsedOfficeResource();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNotUseModal, setOpenNotUseModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleEditRowData = (rowData) => {
    setEditedRowData(rowData);
    setOpenEditModal(true);
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
      render: (rowData) => rowData?.tableData?.index + 1,
      width: "3.125rem",
      sortable: false,
      sorting: false,
    },
    {
      title: "Emloyee Name",
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)} </p>;
      },
      // emptyValue: "-",
      width: "18.75rem",
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
  ];
  const actions = [
    {
      icon: () => <ModeEditOutlineIcon sx={{ color: "#01579B" }} />,
      tooltip: "Edit Logistics",
      onClick: (event, rowData) => handleEditRowData(rowData),
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
        <ButtonComponent
          OnClick={handleOpenModal}
          buttonName={
            <DeleteForeverIcon sx={{ width: "1rem", height: "1rem" }} />
          }
          BGColor="white"
          TextColor="black"
        />
        <ButtonComponent
          OnClick={handleOpenAvailableModal}
          buttonName={"Available Logistics"}
          BGColor="white"
          TextColor="black"
        />
        <ButtonComponent
          OnClick={handleAddOpenModal}
          buttonName={"+Add Office Logistics"}
        />
      </Box>
      <br />
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Used Logistics"
        columns={columns}
        data={officeResourceData}
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
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
          id={editedRowData?.id}
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
      <OpenCLoseModel
        openModal={openNotUseModal}
        handleCloseModal={handleCloseAvailableModal}
        modelName={<AvailableOfficeLogistic />}
        setOpenModal={setOpenNotUseModal}
      />
    </>
  );
};

export default OfficeResource;
