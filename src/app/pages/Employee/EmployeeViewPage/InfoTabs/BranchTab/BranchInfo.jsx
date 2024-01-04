import React, { useState } from "react";
import { useGetBranchHistory } from "../../../../../hooks/branchHistory/useBranchHistory";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import { useGetCompany } from "../../../../../hooks/company/useCompany";
import { AddBranchHistory } from "./BranchInfoModal";

const BranchInfo = ({ data, role }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const { data: branchHistoryData, isLoading } = useGetBranchHistory(data?.id);

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
      title: "Branch Name",
      field: "branchId",
      render: (rowData) => rowData?.branch?.branchName || "-",
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
      title: "Remarks",
      field: "remarks",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Branch Status",
      field: "isRecentBranch",
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
            {rowData?.isRecentBranch ? (
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
        {isLoading
          ? ""
          : role && (
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleAddOpenModal}
              >
                {branchHistoryData?.length !== 0
                  ? "Change Branch"
                  : "Add Branch"}
              </Button>
            )}
      </Box>

      <CustomTable
        columns={columns}
        data={branchHistoryData}
        title="Branch History"
        isLoading={isLoading}
      />

      {openAddModal && (
        <AddBranchHistory
          title={
            branchHistoryData?.length !== 0
              ? "Change Employee Branch"
              : "Add Employee Branch"
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

export default BranchInfo;
