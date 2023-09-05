import React from 'react';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';

const PopOver = ({ triggerContent, popoverContent }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      >
        {popoverContent}
      </Popover>
    </Box>
  );
};

export default PopOver;
