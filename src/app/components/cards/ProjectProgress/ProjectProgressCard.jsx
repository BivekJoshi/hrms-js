import { Box, Stack, Typography } from '@mui/material';
import { LinearProgress } from '@mui/material';
import '../Style/ProjectProgressStyle.css';

import React from 'react';

export const ProjectProgressCard = ({ projectDataCount }) => {
  const BorderLinearProgress = ({ color, ...props }) => {
    return (
      <LinearProgress
        {...props}
        variant='determinate'
        style={{
          height: '.7rem',
          borderRadius: 18,
          backgroundColor: 'white',
        }}
        sx={{
          '& .MuiLinearProgress-bar': {
            borderRadius: '.5rem',
            backgroundColor: color || '#FF4646',
          },
        }}
      />
    );
  };
  return (
    <>
      {/* {projectDataCount?.total > 0 && ( */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Box className='progressBox' bgcolor='#33D77A'>
            <Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
              Completed
            </Typography>
            <Stack
              justifyContent='space-between'
              flexDirection='row'
              marginTop='1rem'
            >
              <Typography> {projectDataCount?.projectInfo?.completed}</Typography>
              <Typography>
                {Math.ceil(
                  (projectDataCount?.projectInfo?.completed / projectDataCount?.projectInfo?.total) * 100
                )}
                %
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant='determinate'
              value={
                (projectDataCount?.projectInfo?.completed / projectDataCount?.projectInfo?.total) * 100
              }
            />
          </Box>
          <Box className='progressBox' bgcolor='#e8c315'>
            <Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
              Pending
            </Typography>
            <Stack
              justifyContent='space-between'
              flexDirection='row'
              marginTop='1rem'
            >
              <Typography> {projectDataCount?.projectInfo?.pending}</Typography>
              <Typography>
                {Math.ceil(
                  // (projectDataCount?.pending / projectDataCount?.total) * 100
                )}
                %
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant='determinate'
              // value={
              //   // (projectDataCount?.pending / projectDataCount?.total) * 100
              // }
            />
          </Box>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Box className='progressBox' bgcolor='#F68828'>
            <Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
              Work In Progress
            </Typography>
            <Stack
              justifyContent='space-between'
              flexDirection='row'
              marginTop='1rem'
            >
              {/* <Typography> {projectDataCount?.workInProgress}</Typography> */}
              <Typography>
                {Math.ceil(
                  // (projectDataCount?.workInProgress / projectDataCount?.total) *
                    100
                )}
                %
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant='determinate'
              value={
                // (projectDataCount?.workInProgress / projectDataCount?.total) *
                100
              }
            />
          </Box>
          <Box className='progressBox' bgcolor='#306ED9'>
            <Typography sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
              Delayed
            </Typography>

            <Stack
              justifyContent='space-between'
              flexDirection='row'
              marginTop='1rem'
            >
              {/* <Typography>{projectDataCount?.delayed}</Typography> */}
              <Typography>
                {Math.ceil(
                  // (projectDataCount?.delayed / projectDataCount?.total) * 100
                )}
                %
              </Typography>
            </Stack>
            <BorderLinearProgress
              variant='determinate'
              // value={
              //   // (projectDataCount?.delayed / projectDataCount?.total) * 100
              // }
            />
          </Box>
        </div>
      </div>
    </>
  );
};
