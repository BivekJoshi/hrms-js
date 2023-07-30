import React from 'react';
import FormModal from '../../../components/Modal/FormModal';
import EmployeeResourceFields from '../../../components/Form/Resource/EmployeeResource/EmployeeResourceFields';

export const AddEmployeeResourceModal=({open,handleCloseModal})=>{
    return(
        <div>
            <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EmployeeResourceFields onClose={handleCloseModal}/>}
            />
        </div>
    )
}
