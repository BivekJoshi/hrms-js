import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

import BasicInfoTab from './BasicInfoTab';
import LeaveRecordsTab from './LeaveRecordsTab';
import AcademicsTab from './AcademicsTab';
import ExperienceTab from './ExperienceTab';

const primaryColor = '#1c7ed6';

const OverviewTabComponents = ({ data }) => {
	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ width: '74%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab
							label='Basic Info'
							value='1'
							style={{
								fontSize: '20px',
								color: primaryColor,
								fontWeight: 'bolder',
							}}
						/>
						<Tab
							label='Leave Records'
							value='2'
							style={{
								fontSize: '20px',
								color: primaryColor,
								fontWeight: 'bolder',
							}}
						/>
						<Tab
							label='Academics'
							value='3'
							style={{
								fontSize: '20px',
								color: primaryColor,
								fontWeight: 'bolder',
							}}
						/>
						<Tab
							label='Experiences'
							value='4'
							style={{
								fontSize: '20px',
								color: primaryColor,
								fontWeight: 'bolder',
							}}
						/>
					</TabList>
				</Box>
				<TabPanel value='1'>
					<BasicInfoTab data={data} />
				</TabPanel>
				<TabPanel value='2'>
					<LeaveRecordsTab />
				</TabPanel>
				<TabPanel value='3'>
					<AcademicsTab />
				</TabPanel>
				<TabPanel value='4'>
					<ExperienceTab />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default OverviewTabComponents;
