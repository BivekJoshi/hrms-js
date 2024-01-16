import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { AddDepartmentHistory } from "./DepartmentInfoModal";
import { useGetDepartmentHistory } from "../../../../../hooks/departmentHistory/useDepartmentHistory";
import ThemeModeContext from '../../../../../../theme/ThemeModeContext';

const DepartmentInfo = ({ data, role }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const { mode } = useContext(ThemeModeContext);

  const { data: branchHistoryData, isLoading } = useGetDepartmentHistory(
    data?.id
  );

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
      field: "departmentId",
      render: (rowData) => rowData?.department?.departmentName || "-",
      // emptyValue: "-",
      width: 300,
      sorting: false,
    },
    {
      title: "Effective From",
      field: "effectiveFromDate",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Effective To",
      field: "effectiveToDate",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Department Status",
      field: "isRecentDepartment",
      emptyValue: "-",
      width: 50,
      render: (rowData) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rowData?.isRecentDepartment ? (
             <span style={{ color: mode === 'light' ? 'green' : '#00ff00' }}>✔</span>
            ) : (
              <span style={{ color: "red" }}>✕</span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Box className="tableIcon">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        {isLoading
          ? ""
          : role && (
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1, textTransform: "capitalize"}}
                onClick={handleAddOpenModal}
              >
                {branchHistoryData?.length !== 0
                  ? "Change Department"
                  : "Add Department"}
              </Button>
            )}
      </Box>

      <CustomTable
        columns={columns}
        data={branchHistoryData}
        title="Department History"
        isLoading={isLoading}
      />

      {openAddModal && (
        <AddDepartmentHistory
          title={
            branchHistoryData?.length !== 0
              ? "Change Employee Department"
              : "Add Employee Department"
          }
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          id={data?.id}
          branchHistoryData={branchHistoryData}
        />
      )}
    </Box>
  );
};

export default DepartmentInfo;
