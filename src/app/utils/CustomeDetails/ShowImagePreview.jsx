import React, { useState } from 'react';
import { DOC_URL } from '../../../auth/axiosInterceptor';
import { Box, Fade, IconButton, Modal, Typography } from '@mui/material';
import { BsEye } from 'react-icons/bs';
import './ShowImagePreview.css';
import CloseIcon from '@mui/icons-material/Close';

const ShowImagePreview = ({ documentData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const openPreview = () => {
    setPreviewOpen(true);
  };
  const closePreview = () => {
    setPreviewOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #808080',
    borderRadius: 2,
    boxShadow: 24,
    p: '12px 24px',
  };
  // console.log('d', documentData?.path)
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Typography variant='p'>
          {document?.name !== 'Expirence Letter' ? documentData?.name : ''}
        </Typography>
        <div
          className='image-preview-container'
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          <img src={DOC_URL + documentData?.path} alt={documentData?.name} />
          <div
            className={`overlay-container ${isHovered ? 'visible' : ''}`}
            onClick={openPreview}
          >
            <BsEye color='white' size={30} />
          </div>
        </div>
      </Box>
      <Modal
        open={isPreviewOpen}
        onClose={closePreview}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
      >
        <Fade in={isPreviewOpen}>
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                width: '100%',
                height: '2rem',
                bottom: '0',
              }}
            >
              <IconButton onClick={closePreview}>
                <CloseIcon />
              </IconButton>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '-webkit-fill-available',
                  paddingBottom: '5%',
                }}
                src={DOC_URL + documentData?.path}
                alt={documentData?.name}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShowImagePreview;
