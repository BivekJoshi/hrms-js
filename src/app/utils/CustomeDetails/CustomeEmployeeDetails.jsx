import {
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
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
import React, { useContext, useEffect, useState } from "react";
import AddFields from "./AddFields";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import CloseIcon from "@mui/icons-material/Close";

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
  modalWidth,
}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const { mode } = useContext(ThemeModeContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth ? modalWidth : 400,
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "12px 24px",
    background: mode === "light" ? "" : "#413e3e",
    color: mode === "light" ? "" : "white",
    // height: "100%",
    overFlow: "scroll",
  };

  useEffect(() => {
    if (isSubmitSuccess) {
      setOpenAddModal(false);
    }
  }, [isSubmitSuccess]);

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedRowId();
    formik.setValues({});
    formik.resetForm();
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
              {!isLoading && data?.length > 0 ? (
                data?.map((row) => {
                  return (
                    <>
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
                      {showDocumentImg && (
                        <TableRow>
                          <TableCell>Test</TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell></TableCell>

                  <TableCell align="center">No Record Found</TableCell>
                </TableRow>
              )}
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
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <Typography variant="h6">
                  {selectedRowId ? "Edit" : "Add"} {title}
                </Typography>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#e0e0e0",
                    position: "absolute",
                    bottom: "0",
                  }}
                />
                <IconButton onClick={handleCloseAddModal}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <AddFields
                fileds={renderFeilds}
                handleFormSubmit={handleFormSubmit}
                onClose={handleCloseAddModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default CustomeEmployeeDetails;
