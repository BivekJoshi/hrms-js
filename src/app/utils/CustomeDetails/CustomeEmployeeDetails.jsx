import {
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddFields from "./AddFields";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: 2,
};
const CustomeEmployeeDetails = ({
  formik,
  title,
  columns,
  isSubmitSuccess,
  data,
  isLoading,
  renderFeilds,
  handleFormSubmit,
  deleteCallBack,
}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();

  useEffect(() => {
    if (isSubmitSuccess) {
      setOpenAddModal(false);
    }
  }, [isSubmitSuccess]);

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedRowId();
    formik.setValues({});
  };

  const handleEdit = (row) => {
    formik.setValues(row);
    setOpenAddModal(true);
    setSelectedRowId(row?.id);
  };
  return (
    <div>
      <Typography variant="h6" textAlign="center">
        {title}
      </Typography>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenAddModal(true);
          }}
          sx={{ textTransform: "capitalize", mb: 1 }}
        >
          + Add
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns?.map((column) => {
                        const value = row[column.id];
                        if (column?.id === "actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "12px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <ModeEditOutlineIcon
                                  sx={{
                                    color: "black",
                                    "&:hover": {
                                      color: "green",
                                    },
                                  }}
                                  onClick={() => handleEdit(row)}
                                />
                                <DeleteIcon
                                  sx={{
                                    color: "black",
                                    "&:hover": {
                                      color: "red",
                                    },
                                  }}
                                  onClick={() => deleteCallBack(row)}
                                />
                              </div>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {openAddModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAddModal}
          onClose={handleCloseAddModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openAddModal}>
            <Box sx={style}>
              <Typography
                sx={{ mb: 5, textAlign: "center" }}
                variant="h6"
                component="h2"
              >
                {selectedRowId ? "Edit" : "Add"} {title}
              </Typography>
              <div style={{ marginTop: "1rem" }}>
                <AddFields
                  fileds={renderFeilds}
                  handleFormSubmit={handleFormSubmit}
                  onClose={handleCloseAddModal}
                />
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default CustomeEmployeeDetails;
