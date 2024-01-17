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
  const { data: qualificationData, isLoading } = useGetQualificationById(
    data?.id
  );

  return (
    !isLoading && (
      <AcademicsComponents data={qualificationData} isLoading={isLoading} />
    )
  );
};

export default AcademicsInfo;
