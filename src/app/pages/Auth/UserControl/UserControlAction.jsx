import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditUserControlModal } from "./Users/AddUserControlModal";
import { useDeleteUserControl } from "../../../hooks/auth/userControl/useUserControl";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";

const UserControlAction = ({ rowData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletedUser, setDeletedUser] = useState({});

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteUserMutation = useDeleteUserControl({rowData});
  const handleDeleteButton = (rowData) => {
    setDeletedUser(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteUserMutation.mutate(deletedUser.id);
    setOpenDeleteModal(false);
  };
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditButton = () => {
    setIsEditModalOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEditButton}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteButton}>Delete</MenuItem>
      </Menu>

      {isEditModalOpen && (
        <EditUserControlModal
          rowData={rowData}
          open={isEditModalOpen}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"User"}
        />
      )}
    </div>
  );
};

export default UserControlAction;
