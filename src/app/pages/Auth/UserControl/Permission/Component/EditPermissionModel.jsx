import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import { Box, Stack, TextField } from "@mui/material";
import { ButtonComponent } from "../../../../../components/Button/ButtonComponent";
import { permissionAddControlForm } from "./permissionAddControlForm";
import { useGetPermissionById } from "../../../../../hooks/auth/permission/usePermission";

export const EditPermissionModel = ({ open, handleCloseModal, id }) => {
  const { data } = useGetPermissionById(id);
  const { formik } = permissionAddControlForm(data);

  const handleFormSubmit = async () => {
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
      if (formik.isValid) {
        handleCloseModal();
      } else {
        toast.error("Please make sure you have filled the form correctly");
      }
    }
  };
 
  return (
    <FormModal
      open={open}
      onClose={handleCloseModal}
      formComponent={
        <Box display="grid" gridTemplateRows="1fr" gap="1rem">
          <h3>Edit Permission</h3>
          <TextField
            id="id"
            name="name"
            label="Permission"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            autoFocus
            InputLabelProps={{ shrink: true }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            gap="1rem"
          >
            <ButtonComponent
              OnClick={handleFormSubmit}
              buttonName={" Edit"}
            />
            <ButtonComponent
              OnClick={handleCloseModal}
              textColor="error"
              BGColor="red"
              buttonName={"Cancel"}
            />
          </Stack>
        </Box>
      }
    />
  );
};

