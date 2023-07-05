import React from 'react'
import { useGetPromotionHistory } from '../../../../../hooks/promotionHistory/usePromotionHistory';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { AddPromotionHistory } from './PromotionHistoryModal';
import { useState } from 'react';

const PromotionHistory = () => {
    const { id } = useParams();
    const { data: PromotionHistory, isLoading } = useGetPromotionHistory(id);
    console.log("PromotionHistory", PromotionHistory)

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