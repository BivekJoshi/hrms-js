import React from 'react';
import { getMaleEmployeeById } from './EmailSorting';

const EmailSending = () => {
    const  maleData = getMaleEmployeeById();

console.log(maleData)
    return (
        <div>
        hello    
        </div>
    );
};

export default EmailSending;