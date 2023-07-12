import React from 'react'
import { useGetPromotionHistory } from '../../../../../hooks/promotionHistory/usePromotionHistory';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { AddPromotionHistory } from './PromotionHistoryModal';
import { useState } from 'react';
import MaterialTable from '@material-table/core';
const columns = [
    // {
    //   title: "employeeId",
    //   field: "employeeId",
    //   emptyValue: "-",
    //   width: 200,
    // },
    {
      title: "positionId",
      field: "positionId",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "effectiveFromDate",
      field: "effectiveFromDate",
      emptyValue: "-",
      width: 200,
    },
    {
        title: "effectiveToDate",
        field: "effectiveToDate",
        emptyValue: "-",
        width: 200,
      },
      {
        title: "remarks",
        field: "remarks",
        emptyValue: "-",
        width: 200,
      },
      {
        title: "lastPosition",
        field: "lastPosition",
        emptyValue: "-",
        width: 200,
      },
  ];
const PromotionHistory = () => {
    const { id } = useParams();
    const { data: PromotionHistory, isLoading } = useGetPromotionHistory(id);

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleAddOpenModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant='contained'
                    sx={{ mt: 3, ml: 1 }}
                    onClick={handleAddOpenModal}
                >
                    +Add Promotion
                </Button>
            </Box>

            <MaterialTable
                columns={columns}
                data={PromotionHistory}
                title=""
                isLoading={isLoading}
                options={{
                    padding: "dense",
                    margin: 50,
                    pageSize: 12,
                    emptyRowsWhenPaging: false,
                    headerStyle: {
                        backgroundColor: "#1c7ed6",
                        color: "#FFF",
                        fontSize: 20,
                        padding: "dense",
                        height: 50,
                    },
                    rowStyle: {
                        fontSize: 18,
                    },
                }}
            />

            {openAddModal && (
                <AddPromotionHistory
                    open={openAddModal}
                    handleCloseModal={handleCloseAddModal}
                />
            )}
        </>
    )
}

export default PromotionHistory