import React, { useState } from "react";
import { Box, Button } from '@mui/material';
import CustomTable from '../../../../../components/CustomTable/CustomTable';
import { AddDepartmentHistory } from './DepartmentInfoModal';
import { useGetDepartmentHistory } from '../../../../../hooks/departmentHistory/useDepartmentHistory';

const DepartmentInfo = ({ data, role }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const { data: branchHistoryData, isLoading } = useGetDepartmentHistory(data?.id);

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
              <span style={{ color: "green" }}>✔</span>
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
        {role && (
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddOpenModal}
          >
            + Add Department
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
          title={"Add Department History"}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          id={data?.id}
        />
      )}
    </Box>
  )
};

export default DepartmentInfo;
