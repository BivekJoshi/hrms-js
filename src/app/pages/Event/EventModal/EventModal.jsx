import React, { useState } from "react";

import FormModal from "../../../components/Modal/FormModal";
import { useGetEventById } from "../../../hooks/event/useEvent";
import EditEventFields from "../../../components/Form/Event/EditEventFields";

export const AddEventModal = ({ open, handleCloseModal }) => {
  const [openSubmitModal, setOpenSubmitModal] = useState();

  const handleOpenSubmitModal = () => setOpenSubmitModal(true);

  const { formik } = useEventForm(handleOpenSubmitModal,handleCloseModal);

  const [openEmail, setOpenEmail] = useState(false);

  const handleFormSubmit = async () => {
    formik.handleSubmit();
    if (!formik.isValidating && formik.isValid) {
      onClose(handleCloseModal);
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
  };

  const handleEmailButtonClick = () => {
    setOpenEmail(true);
    setOpenSubmitModal(false);
  };

  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <>
            {/*Import Event Field Here*/}
            <AddEventFields formik={formik} />
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                variant="contained"
                onClick={handleFormSubmit}
                onClose={handleCloseModal}
                sx={{ mt: 3, ml: 1 }}
              >
                Add Event
              </Button>
              <Button
                variant="contained"
                // onClick={handl/eCloseModal}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
            </Grid>
          </>
        }
      />
      <FormModal
        open={openSubmitModal}
        onClose={() => setOpenSubmitModal(false)}
        formComponent={
          <div>
            <h2>Event Added Successfully!</h2>
            <p>Do you like to Email this event to Employee.</p>
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
                onClick={() => {
                  setOpenSubmitModal(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                No
              </Button>
            </Box>
          </div>
        }
      />

      <FormModal
        open={openEmail}
        onClose={() => setOpenEmail(false)}
        formComponent={
          <div>
            <EmailToAll formik={formik} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleEmailButtonClick}
              >
                Send
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenEmail(false);
                }}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </div>
        }
      />
    </div>
  );
};

export const OpenEvent = ({ open, handleCloseModal, id }) => {
  const { data } = useGetEventById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditEventFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
