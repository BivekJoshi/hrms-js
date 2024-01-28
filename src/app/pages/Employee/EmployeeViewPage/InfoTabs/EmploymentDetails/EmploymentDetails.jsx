import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { useParams } from "react-router-dom";
import { useGetEmployeeEmployment } from "../../../../../hooks/employee/useEmployeeHistory";
import { AddEmploymentHistory } from "./AddEmploymentHistory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import EmploymentTransfer from "./EmploymentTransfer";
import EmployeeUpDown from "./EmployeeUpDown";
import AddEmpoyeePosition from "./AddEmployeePosition";
import EditEmploymentDetails from "./EditEmploymentDetails";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import EmployeeTransferAndUpgrade from "./EmployeeTransferAndUpgrade";

const EmploymentDetails = ({ role, employeeId }) => {
  const { id } = useParams();

  const { isEmployee } = useAuth();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [addPosition, setAddPosition] = useState(false);
  const [multiPosition, setmultiPosition] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const [editModal, setEditModal] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setmultiPosition(false);
  };

  const { data: employeeHistory, isLoading } = useGetEmployeeEmployment(id || employeeId);

  const activeData = employeeHistory?.filter((item) => item?.isActive === true);

  const [actionDD, setActionDD] = React.useState("Actions");

  const handleChange = (event) => {
    setActionDD(event.target.value);
    if (event.target?.value === "AddPosition") {
      setAddPosition(true);
    }
  };

  const handleAddPositionConfirm = () => {
    setAddPosition(false);
    setOpenAddModal(true);
    setmultiPosition(true);
    setActionDD("Actions");
  };

  const handleEditDetails = (rowData) => {
    setRowData(rowData);
    setEditModal(true);
  };
  const handleEditModalClose = () => {
    setEditModal(false);
    setRowData([]);
  };

  const handleSuccess = () => setActionDD("Actions");

  const minDate = employeeHistory?.[0]?.effectiveDateFrom;

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      maxWidth: "50px",
      sortable: false,
      sorting: false,
    },
    {
      title: "Department Name",
      field: "department.departmentName",
      emptyValue: "-",
      width: 300,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Branch Name",
      field: "branch.branchName",
      emptyValue: "-",
      width: 300,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Position Hold",
      field: "position.positionName",
      emptyValue: "-",
      width: 300,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "From Date",
      field: "effectiveDateFrom",
      emptyValue: "-",
      width: 200,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "To Date",
      field: "effectiveDateTo",
      emptyValue: "-",
      width: 200,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Remarks",
      field: "remarks",
      emptyValue: "-",
      width: 200,
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Active",
      field: "isActive",
      render: (rowData) => {
        return (
          <Typography textAlign="center">
            {rowData?.isActive ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              <CancelIcon sx={{ color: "red" }} />
            )}
          </Typography>
        );
      },
      emptyValue: "-",
      width: 50,
    },
    {
      title: "Action",
      field: "action",
      render: (rowData) => {
        return (
          activeData?.length > 1 &&
          rowData?.isActive && (
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleEditDetails(rowData)}
            />
          )
        );
      },
    },
  ];

  const goback = () => setActionDD("Actions");
  return (
    <Box className="tableIcon">
      {!isEmployee && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingBottom: "12px",
          }}
        >
          {employeeHistory && employeeHistory?.length > 0 ? (
            actionDD === "Actions" && (
              <FormControl sx={{ mt: 2, minWidth: 200 }} size="small">
                <InputLabel id="demo-select-small-label">Actions</InputLabel>
                <Select
                  labelId="actions"
                  id="actions"
                  value={actionDD}
                  label="Actions"
                  onChange={handleChange}
                >
                  <MenuItem value="Actions">
                    <em>None</em>
                  </MenuItem>
                  {activeData && activeData?.length > 1 && (
                    <MenuItem value="AllTransfer/Upgrade">
                      Transfer or Up/Downgrade
                    </MenuItem>
                  )}
                  {activeData && activeData?.length === 1 && (
                    <MenuItem value="Transfer">Transfer</MenuItem>
                  )}
                  {activeData && activeData?.length === 1 && (
                    <MenuItem value="Up/Downgrade">Up/Downgrade</MenuItem>
                  )}
                  <MenuItem value="AddPosition">Add Position </MenuItem>
                </Select>
              </FormControl>
            )
          ) : (
            <Button
              variant="contained"
              sx={{ mt: 2, ml: 1 }}
              onClick={handleAddOpenModal}
            >
              Add
            </Button>
          )}
        </Box>
      )}

      {(actionDD === "Actions" || actionDD === "AddPosition") && (
        <CustomTable
          columns={columns?.filter((col) => {
            if (isEmployee) {
              return col.field !== "action";
            } else return col;
          })}
          data={employeeHistory}
          title="Employment Details"
          isLoading={isLoading}
        />
      )}

      {actionDD === "Transfer" && employeeHistory?.length > 0 && (
        <EmploymentTransfer
          data={employeeHistory}
          handleSuccess={handleSuccess}
          minDate={minDate}
          backCallBack={goback}
        />
      )}
      {actionDD === "Up/Downgrade" && employeeHistory?.length > 0 && (
        <EmployeeUpDown
          data={employeeHistory}
          handleSuccess={handleSuccess}
          minDate={minDate}
          backCallBack={goback}
        />
      )}
      {actionDD === "AddPosition" &&
        employeeHistory?.length > 0 &&
        addPosition && (
          <AddEmpoyeePosition
            open={addPosition}
            handleCloseModal={() => {
              setAddPosition(false);
              setActionDD("Actions");
            }}
            minDate={minDate}
            handleConfirm={handleAddPositionConfirm}
          />
        )}

      {actionDD === "AllTransfer/Upgrade" && (
        <EmployeeTransferAndUpgrade
          handleSuccess={handleSuccess}
          backCallBack={goback}
        />
      )}

      {openAddModal && (
        <AddEmploymentHistory
          title={"Add Employment Details"}
          open={openAddModal}
          onClose={handleCloseAddModal}
          multiplePosition={multiPosition}
        />
      )}
      {editModal && (
        <EditEmploymentDetails
          open={editModal}
          handleClose={handleEditModalClose}
          tableId={rowData?.id}
          minDate={minDate}
          rowData={rowData}
        />
      )}
    </Box>
  );
};

export default EmploymentDetails;
