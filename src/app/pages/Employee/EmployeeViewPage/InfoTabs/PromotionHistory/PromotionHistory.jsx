import React from 'react'
import { useGetPromotionHistory } from '../../../../../hooks/promotionHistory/usePromotionHistory';
import { useParams } from 'react-router-dom';

const PromotionHistory = () => {
    const { id } = useParams();
    const { data: PromotionHistory, isLoading } = useGetPromotionHistory(id);
    console.log("PromotionHistory",PromotionHistory)
    return (
        <div>PromotionHistory</div>
    )
}

export default PromotionHistory