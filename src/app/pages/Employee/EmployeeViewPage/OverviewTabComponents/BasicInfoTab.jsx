import React from 'react';

import './Style.css';
import ListUserDetails from '../Components/ListUserDetails';
import { Grid } from '@mui/material';

const BasicInfoTab = ({ data }) => {
	const EMPLOYEE = {
		Gender: data?.gender,
		'Citizenship Number': data?.citizenshipNumber,
		'Date of Birth': data?.dateOfBirth,
		'Mobile Number': data?.mobileNumber,
		Email: data?.officeEmail,
		// Address: data?.addresses[0].city,
		'Marital Status': data?.maritalStatus,
		'Date of Join': data?.dateOfJoin,
		Position: data?.position.positionName,
		Department: data?.department.departmentName,
	};

	const FAMILYMEMBERS = {
		Name: data?.familyMembers[0]?.name || '',
		// Relation: data?.familyMembers[0].relation || '',
		// 'Contact Number': data?.familyMembers[0].mobileNumber,
	};

	const BANKDETAILS = {
		'Bank Name': data?.bankDetailSet[0]?.bankName || '',
		'Account Number': data?.bankDetailSet[0]?.bankAccountNumber || '',
		Location: data?.bankDetailSet[0]?.bankAddress || '',
		'PAN Number': data?.panNumber,
		Salary: data?.position?.salary,
	};
	return (
		<>
			<Grid container>
				<Grid item xs={6}>
					<ListUserDetails data={EMPLOYEE} cardTitle={'Basic Info Details'} />
				</Grid>
				<Grid item xs={6}>
					<div className='FAM-BANK-DETAILS'>
						<ListUserDetails data={BANKDETAILS} cardTitle={'Bank Details'} />
						<ListUserDetails
							data={FAMILYMEMBERS}
							cardTitle={'Family Info Details'}
						/>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default BasicInfoTab;
