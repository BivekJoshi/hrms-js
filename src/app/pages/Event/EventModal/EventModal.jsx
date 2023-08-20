import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";

import FormModal from "../../../components/Modal/FormModal";
import AddEventFields from "../../../components/Form/Event/AddEventFields";
import { useGetEventById } from "../../../hooks/event/useEvent";
import EditEventFields from "../../../components/Form/Event/EditEventFields";
import useEventForm from "../../../hooks/event/EventForm/useEventForm";

export const AddEventModal = ({ open, handleCloseModal }) => {
  const [openSubmitModal, setOpenSubmitModal] = useState();

  const handleOpenSubmitModal = () => setOpenSubmitModal(true);

  const { formik } = useEventForm(handleOpenSubmitModal);

  const handleFormSubmit = async () => {
    formik.handleSubmit();
    if (!formik.isValidating && formik.isValid) {
      // handleOpenSubmitModal();
      handleCloseModal();
      // setOpenSubmitModal(true);
    } else {
      toast.error("Please make sure you have filled the form correctly");
    }
    // handleCloseModal();
  };

  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <>
            <AddEventFields onClose={handleCloseModal} formik={formik} />
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{ mt: 3, ml: 1 }}
                color="error"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleFormSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Add Event
              </Button>
            </Grid>

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
                      // onClick={handleEmailButtonClick}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenSubmitModal(false);
                        handleCloseModal();
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
          </>
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
