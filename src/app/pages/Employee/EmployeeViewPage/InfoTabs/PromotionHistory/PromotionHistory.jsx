import React from "react";
import { useGetPromotionHistory } from "../../../../../hooks/promotionHistory/usePromotionHistory";
import { Box, Button } from "@mui/material";
import { AddPromotionHistory } from "./PromotionHistoryModal";
import { useState } from "react";
import "../../EmployProfile/Style/Style.css";
import CustomTable from "../../../../../components/CustomTable/CustomTable";

const PromotionHistory = ({ data, role }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const { data: PromotionHistory, isLoading } = useGetPromotionHistory(
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
      title: "Position Name",
      field: "position.positionName",
      emptyValue: "-",
      width: 100,
      sorting: false,
    },
    {
      title: "Effective From",
      field: "effectiveFromDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Effective To",
      field: "effectiveToDate",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Remarks",
      field: "remarks",
      emptyValue: "-",
      width: 250,
      render: (rowData) => (
        <div
          style={{
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
          }}
        >
          {rowData?.remarks}
        </div>
      ),
    },
    {
      title: "Position Hold",
      field: "isLastPosition",
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
            {rowData.isLastPosition === true ? (
              <span style={{ color: "green", fontSize: "1.2rem" }}>✔</span>
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
                {PromotionHistory?.length !== 0
                  ? " Change Position"
                  : "Add Position"}
              </Button>
            )}
      </Box>

      <CustomTable
        columns={columns}
        data={PromotionHistory}
        title="Position History"
        isLoading={isLoading}
      />

      {openAddModal && (
        <AddPromotionHistory
          title={
            PromotionHistory?.length !== 0 ? " Change Position" : "Add Position"
          }
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          PromotionHistory={PromotionHistory}
        />
      )}
    </Box>
  );
};

export default PromotionHistory;
