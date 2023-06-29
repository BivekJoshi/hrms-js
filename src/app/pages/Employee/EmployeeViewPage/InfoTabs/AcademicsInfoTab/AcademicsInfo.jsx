import React from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box } from '@mui/material';
import AcademicsComponents from './AcademicsComponents';

const AcademicsInfo = ({ data }) => {
	return (
		<>
			<Box
				className='profileBasic'
				sx={{
					width: 500,
					height: 450,
					bgcolor: '#ededed',
				}}
			>
				<Timeline
					sx={{
						[`& .${timelineItemClasses.root}:before`]: {
							flex: 0,
							padding: 0,
						},
					}}
				>
					{data.qualifications
						.sort((a, b) => b.passedYear - a.passedYear)
						.map((item, index) => (
							<AcademicsComponents key={index} data={item} />
						))}
				</Timeline>
			</Box>
		</>
	);
};

export default AcademicsInfo;
