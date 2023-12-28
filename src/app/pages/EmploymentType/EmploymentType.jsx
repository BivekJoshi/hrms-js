import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import HocButton from "../../hoc/hocButton";
import CustomTable from "../../components/CustomTable/CustomTable";
import FormModal from "../../components/Modal/FormModal";
import EmploymentTypeFields from "../../components/Form/EmploymentType/EmploymentTypeFields.jsx";
import { useDeleteEmploymentType, useGetEmploymentType } from "../../hooks/employmentType/useEmploymentType.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal.jsx";

const EmploymentType = () => {
  const { data: employmentTypeData, isLoading } = useGetEmploymentType();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);

  const [deletedType,setDeletedType]=useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseDeleteModal=()=>setOpenDeleteModal(false);

  const deleteTypeMutation = useDeleteEmploymentType({});
  const handleDeleteType=(rowData)=>{
    setDeletedType(rowData);
    setOpenDeleteModal(true);
  }

  const handleConfirmDelete=()=>{
    deleteTypeMutation.mutate(deletedType.id);
    setOpenDeleteModal(false);
  }


  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: "1px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Type Name",
      field: "name",
      emptyValue: "-",
      width: 200,
      sorting: false,
    },
    {
      title: "Description",
      field: "description",
      emptyValue: "-",
      width: 200,
      sorting: false,
    },
  ].filter(Boolean);

  const actions = [
    // {
    //   icon: () => <EditIcon />,
    //   tooltip: "Edit Detail",
    //   // onClick: (event, rowData) => handleEditDesignation(rowData),
    // },
    {
      icon: () => <DeleteIcon />,
      tooltip: "Delete",
      onClick: (event, rowData) => handleDeleteType(rowData),
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleAddOpenModal}
        >
          + Add Employment Type
        </Button>
      </Box>
      <br />
      <CustomTable
        columns={columns}
        data={employmentTypeData}
        title="Employment Type"
        actions={actions}
        // isLoading={isLoading}
      />

      {openAddModal && (
        <FormModal
          title={"Add Employment Type"}
          open={openAddModal}
          onClose={handleCloseAddModal}
          formComponent={<EmploymentTypeFields onClose={handleCloseAddModal} />}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Employment Type"}
        />
        
      )}
    </>
  );
};

export default EmploymentType;