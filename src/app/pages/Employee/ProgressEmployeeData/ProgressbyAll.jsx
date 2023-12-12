import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  const { value, labelColor, progressColor } = props;

  const labelStyle = {
    color: labelColor || 'black',
  };

  const circularProgressStyle = {
    color: progressColor || 'gray',
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        style={circularProgressStyle}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          <span style={labelStyle}>{`${Math.round(value)}%`}</span>
        </Typography>
      </Box>
    </Box>
  );
}

const ProgressbyAll = ({ ProgressbyAll }) => {
  const {
    bankSet,
    companySet,
    departmentSet,
    familySet,
    addressSet,
    positionSet,
    employmentHistoryAdded,
    qualificationAdded,
  } = ProgressbyAll;

  const calculateProgress = () => {
    const filledItems = [
      bankSet,
      companySet,
      departmentSet,
      familySet,
      addressSet,
      positionSet,
      employmentHistoryAdded,
      qualificationAdded,
    ].filter((item) => item).length;

    const progress = (filledItems / 8) * 100;

    return progress;
  };

  const progress = calculateProgress();

  const labelColor = progress < 50 ? 'red' : 'green';
  const progressColor = progress < 50 ? 'lightcoral' : 'lightgreen';

  return (
    <CircularProgressWithLabel
      value={progress}
      labelColor={labelColor}
      progressColor={progressColor}
    />
  );
};

export default ProgressbyAll;
