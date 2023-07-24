import React, { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import EmailToAll from "../../pages/Email/EmailToAll";
import { useGetEmployee } from "../../hooks/employee/useEmployee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #808080",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, handleProceed, onClose, data }) => {
  const {data : employeeData } = useGetEmployee();
  const [openEmail, setOpenEmail] = useState(false);

  const handleEmailButtonClick = () => {
    handleProceed();
    setOpenEmail(true);
  };

  const handleCloseEmailform = () => {
    setOpenEmail(false);
    onClose();
  };

  return (
    <div>
        <Modal
        open={open}
        onClose={() => onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <h3>Do you like to Email this event to Employee</h3>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleEmailButtonClick}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => onClose() }
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                No
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
      {openEmail && (
        <EmailToAll
          employeeData={employeeData}
          employeeid={employeeData.id}
          eventId={data?.id}
          open={openEmail}
          onClose={handleCloseEmailform}
        />
      )}
    </div>
  );
};

export default ModalComponent;