import React from "react";
import { useGetPromotionHistory } from "../../../../../hooks/promotionHistory/usePromotionHistory";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AddPromotionHistory } from "./PromotionHistoryModal";
import { useState } from "react";
import "../../EmployProfile/Style/Style.css";
import { useGetDesignation } from "../../../../../hooks/designation/useDesignation";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import { useGetLoggedInUserInfo } from "../../../../../hooks/employee/useEmployee";
import CustomTable from "../../../../../components/CustomTable/CustomTable";

const PromotionHistory = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  const { id } = useParams();
  const { data: PromotionHistory, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetPromotionHistory(id)
      : useGetPromotionHistory(loggedInUserData?.id);

  const { data: designationData, isLoading: loadingDesignation } =
    useGetDesignation();
  // const { data: trainingData } = useGetTrainingByEmpId(id);

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // const mappedPromotionHistory = PromotionHistory?.map((item) => {
  //   const position = designationData?.find((pos) => pos.id === item.positionId);
  //   const positionName = `${position?.positionName || "-"} (${
  //     position?.positionLevel || "-"
  //   })`;
  //   return {
  //     ...item,
  //     positionId: positionName,
  //   };
  // });

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
              <span style={{ color: "green", fontSize:"1.2rem" }}>✔</span>
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
            + Add Position
          </Button>
        ) : (
          ""
        )}
      </Box>

      <CustomTable
        columns={columns}
        data={PromotionHistory}
        title="Designation List"
        isLoading={isLoading || loadingDesignation}
      />

      {openAddModal && (
        <AddPromotionHistory
          title={"Add Promotion"}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
    </Box>
  );
};

export default PromotionHistory;
