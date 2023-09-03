import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";

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

const Event = ({ permissions }) => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [getEventID, setEventGetID] = useState({});

  // console.log("🚀 ~ file: Event.jsx:38 ~ Event ~ openAddModal:", openAddModal);

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
  const { formik ,data} = useEventForm(setOpenSubmitModal, handleCloseModal);

  const handleFormSubmit = async () => {
    formik.handleSubmit();
    if (!formik.isValidating && formik.isValid) {
    } else {
      toast.error("Please make sure you have filled the form correctly");
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HocButton
          permissions={permissions.canAdd}
          color={"primary"}
          variant={"contained"}
          onClick={() => setOpenAddModal(true)}
          buttonName={"+Add Event"}
        />
      </Box>
      <br />

      {openAddModal && (
        <FormModal
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
              >
                <Button
                  variant="contained"
                  onClick={handleFormSubmit}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Add Event
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  sx={{ mt: 3, ml: 1 }}
                  color="error"
                >
                  Cancel
                </Button>
              </Grid>
            </>
          }
        />
      )}
      {openSubmitModal && (
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
      )}

      {openEmailModal && (
        <FormModal
          open={openEmailModal}
          onClose={() => setOpenEmailModal(false)}
          formComponent={
            <div>
              <EmailToAll getEventID={data?.id} onClose={()=>setOpenEmailModal(false)}/>
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
          id={getEventID}
          open={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(Event);
