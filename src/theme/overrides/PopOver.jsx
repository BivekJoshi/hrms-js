import React, { useContext } from 'react';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';
import ThemeModeContext from '../ThemeModeContext';

const PopOver = ({ triggerContent, popoverContent }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { mode } = useContext(ThemeModeContext);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box marginTop=".5rem">
      <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {triggerContent}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: {
            backgroundColor: mode === 'light' ? '#fff' : '#140505',
            color: mode === 'light' ? '#000' : '#fff',
          },
        }}
      >
        {popoverContent}
      </Popover>
    </Box>
  );
};

export default PopOver;
