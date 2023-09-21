import React from "react";
import { useGetPromotionHistory } from "../../../../../hooks/promotionHistory/usePromotionHistory";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AddPromotionHistory } from "./PromotionHistoryModal";
import { useState } from "react";
import MaterialTable from "@material-table/core";
import "../../EmployProfile/Style/Style.css";
import { useGetDesignation } from "../../../../../hooks/designation/useDesignation";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import { useGetLoggedInUserInfo } from "../../../../../hooks/employee/useEmployee";

const PromotionHistory = () => {
  const {
    isSuperAdmin,
    isAdmin,
    isHr,
    isEmployee,
    isHrAdmin,
    isManager,
  } = useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  const { id } = useParams();
  const { data: PromotionHistory, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetPromotionHistory(id)
      : useGetPromotionHistory(loggedInUserData?.id);

  const {
    data: designationData,
    isLoading: loadingDesignation,
  } = useGetDesignation();

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const mappedPromotionHistory = PromotionHistory?.map((item) => {
    const position = designationData?.find((pos) => pos.id === item.positionId);
    const positionName = `${position?.positionName || "-"} (${
      position?.positionLevel || "-"
    })`;
    return {
      ...item,
      positionId: positionName,
    };
  });

  const columns = [
    {
      title: "Position Name",
      field: "positionId",
      emptyValue: "-",
      width: 300,
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
      title: "Position Hold",
      field: "lastPosition",
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
            {rowData.lastPosition ? (
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
        {!isEmployee ? (
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddOpenModal}
          >
            +Add Promotion
          </Button>
        ) : (
          ""
        )}
      </Box>

      <MaterialTable
        style={{ padding: "1rem" }}
        columns={columns}
        data={mappedPromotionHistory}
        title="Promotion History"
        isLoading={isLoading || loadingDesignation} // Consider both loading states
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 13,
          },
        }}
      />

      {openAddModal && (
        <AddPromotionHistory
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </Box>
  );
};

export default PromotionHistory;
