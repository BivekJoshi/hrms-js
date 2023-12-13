import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetEvent } from "../../hooks/event/useEvent";
import useEventForm from "../../hooks/event/EventForm/useEventForm";
import { OpenEvent } from "./EventModal/EventModal";
import EmailToAll from "../Email/EmailToAll";

import HocButton from "../../hoc/hocButton";
import PermissionHoc from "../../hoc/permissionHoc";

import FormModal from "../../components/Modal/FormModal";
import AddEventFields from "../../components/Form/Event/AddEventFields";
import useAuth from "../../../auth/hooks/component/login/useAuth";
import { ButtonComponent } from '../../components/Button/ButtonComponent';

const Event = ({ permissions }) => {
  const { isEmployee, isHrClerk } = useAuth();

  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [getEventID, setEventGetID] = useState({});

  const { data: eventData, isLoading } = useGetEvent();

  useEffect(() => {
    if (eventData) {
      const formattedEvents = eventData.map((event) => ({
        title: event?.eventName,
        date: event?.eventDate,
        description: event?.eventDescription,
        id: event?.id,
      }));
      setEvents(formattedEvents);
    }
  }, [eventData]);

  const handleCloseModal = () => setOpenAddModal(false);
  const { formik, data } = useEventForm(setOpenSubmitModal, handleCloseModal);

  const handleFormSubmit = async () => {
    formik.handleSubmit();
    if (!formik.isValidating && formik.isValid) {
    }
  };
  const handleOpenModal = (e) => {
    setEventGetID(e?.event?._def?.publicId);
    setOpenModal(true);
  };

  const handleEmailButtonClick = () => {
    setOpenEmailModal(true);
    setOpenSubmitModal(false);
  };

  return (
    <>
      {isEmployee || isHrClerk ? null : (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <HocButton
            permissions={permissions}
            color={"#fff"}
            variant={"contained"}
            onClick={() => setOpenAddModal(true)}
            buttonName={"+Add Event"}
          />
        </Box>
      )}
      <br />

      {openAddModal && (
        <FormModal
          title={"Add Event"}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          formComponent={
            <>
              {/*Import Event Field Here*/}
              <AddEventFields formik={formik} />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                gap={1}
                mt={2}
              >
                <ButtonComponent
                variant="contained"
                OnClick={handleFormSubmit}
                // sx={{ mt: 3, ml: 1 }}
                buttonName={"Add Event"}
                />
                <ButtonComponent
                  variant="contained"
                  OnClick={handleCloseModal}
                  // sx={{ mt: 3, ml: 1 }}
                  BGColor={"#d32f2f"}
                  buttonName={"Cancel"}
                />
              </Grid>
            </>
          }
        />
      )}
      {openSubmitModal && (
        <FormModal
        title={"Event"}
          open={openSubmitModal}
          onClose={() => setOpenSubmitModal(false)}
          formComponent={
            <div>
              <Typography variant="h4">Event Added Successfully!</Typography>
              <p>Do you like to Email this event to Employee.</p>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <ButtonComponent
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  OnClick={handleEmailButtonClick}
                 buttonName={"Yes"} 
                />
                <ButtonComponent
                  variant="contained"
                  OnClick={() => {
                    setOpenSubmitModal(false);
                  }}
                  sx={{ mt: 3, ml: 1 }}
                  BGColor={"#d32f2f"}
                  color="#fff"
                  buttonName={"No"}
                />
              </Box>
            </div>
          }
        />
      )}

      {openEmailModal && (
        <FormModal
        title={"Send Email"}
          open={openEmailModal}
          onClose={() => setOpenEmailModal(false)}
          formComponent={
            <div>
              <EmailToAll
                getEventID={data?.id}
                onClose={() => setOpenEmailModal(false)}
              />
            </div>
          }
        />
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventClick={handleOpenModal}
      />

      {openModal && (
        <OpenEvent
        title={"Edit Event"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default PermissionHoc(Event);
