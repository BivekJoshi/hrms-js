import React, { useEffect, useState } from 'react';
import { DOC_URL } from '../../../auth/axiosInterceptor';
import {
  Box,
  Fade,
  IconButton,
  Modal,
  TableCell,
  Typography,
} from '@mui/material';
import { BsEye } from 'react-icons/bs';
import './ShowImagePreview.css';
import CloseIcon from '@mui/icons-material/Close';

const ShowImagePreview = ({ row }) => {
  const [documentData, setDocumentData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const accumulateDocumentData = () => {
      const newDocumentData = [];

      const {
        transcriptPath,
        otherDocumentPath,
        characterCertificatePath,
        experiencePath,
      } = row;

      if (transcriptPath) {
        newDocumentData.push({
          name: 'Transcript',
          path: transcriptPath,
        });
      }
      if (experiencePath) {
        newDocumentData.push({
          name: 'Expirence Letter',
          path: experiencePath,
        });
      }

      if (otherDocumentPath) {
        newDocumentData.push({
          name: 'Other Document',
          path: otherDocumentPath,
        });
      }

      if (characterCertificatePath) {
        newDocumentData.push({
          name: 'Character Certificate',
          path: characterCertificatePath,
        });
      }

      setDocumentData(newDocumentData);
    };

    accumulateDocumentData();
  }, [row]);

  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const openPreview = (name) => {
    setPreviewOpen(true);
    setSelectedItem(name);
  };
  const closePreview = () => {
    setPreviewOpen(false);
    setSelectedItem();
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

  const singleDoc = documentData?.map((document) => {
    return (
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Typography variant='p'>
            {document?.name !== 'Expirence Letter' ? document?.name : ''}
          </Typography>
          <div
            className='image-preview-container'
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <img src={DOC_URL + document?.path} alt={document?.name} />
            <div
              className={`overlay-container ${isHovered ? 'visible' : ''}`}
              onClick={() => openPreview(document?.name)}
            >
              <BsEye color='white' size={30} />
            </div>
          </div>
        </Box>
      </TableCell>
    );
  });

  return (
    <>
      {singleDoc}

      {selectedItem && (
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
                  src={
                    DOC_URL +
                    documentData?.find((item) => item?.name === selectedItem)
                      ?.path
                  }
                  alt={document?.name}
                />
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default ShowImagePreview;
