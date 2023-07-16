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
      title: "Position Name",
      field: "positionId",
      emptyValue: "-",
      width: 100,
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
        title: "Last Position",
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
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    headerStyle: {
                        backgroundColor: "#01579b",
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