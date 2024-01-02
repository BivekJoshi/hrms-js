import React, { useContext } from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box } from '@mui/material';
import AcademicsComponents from './AcademicsComponents';
import '../../EmployProfile/Style/Style.css';
import ThemeModeContext from '../../../../../../theme/ThemeModeContext';
import { useGetQualificationById } from '../../../../../hooks/employee/useQualification';
import { useSelector } from 'react-redux';

const AcademicsInfo = ({ data }) => {
  const { data: qualificationData, isLoading } = useGetQualificationById(data?.id);

  const { mode } = useContext(ThemeModeContext);
  return !isLoading && (
    <Box
      className='profileBasic'
      sx={{
        bgcolor: mode === 'light' ? '#ededed' : '#454546',
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          marginTop: '0rem',
        }}
      >
        {qualificationData
          ? qualificationData
              .sort((a, b) => b.passedYear - a.passedYear)
              .map((item, index) => (
                <AcademicsComponents key={index} data={item} />
              ))
          : ''}
      </Timeline>
    </Box>
  );
};

export default AcademicsInfo;
