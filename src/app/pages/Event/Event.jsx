import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useGetEvent } from '../../hooks/event/useEvent';
import useEventForm from '../../hooks/event/EventForm/useEventForm';
import { OpenEmpEvent, OpenEvent } from './EventModal/EventModal';
import EmailToAll from '../Email/EmailToAll';

import HocButton from '../../hoc/hocButton';
import PermissionHoc from '../../hoc/permissionHoc';

import FormModal from '../../components/Modal/FormModal';
import AddEventFields from '../../components/Form/Event/AddEventFields';
import useAuth from '../../../auth/hooks/component/login/useAuth';
import { ButtonComponent } from '../../components/Button/ButtonComponent';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import EventList from './EventList';

const Event = ({ permissions }) => {
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
  const { formik, eventId } = useEventForm(
    setOpenSubmitModal,
    handleCloseModal
  );

  const handleFormSubmit = async () => {
    formik.handleSubmit();
    if (formik.isValid) {
    }
  };
  const handleOpenModal = (e) => {
    const eId = e?.event?._def?.publicId;
    if (eId) {
      setEventGetID(eId);
      setOpenModal(true);
    }
  };

  const handleEmailButtonClick = () => {
    setOpenEmailModal(true);
    setOpenSubmitModal(false);
  };

  const hasPermission = permissions?.canEdit;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HocButton
          permissions={permissions?.canAdd}
          color={'#fff'}
          variant={'contained'}
          onClick={() => setOpenAddModal(true)}
          buttonName={'Add Event'}
        />
      </Box>

      <br />

      {openAddModal && (
        <FormModal
          title={'Add Event'}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          formComponent={
            <>
              {/*Import Event Field Here*/}
              <AddEventFields formik={formik} />
              <Grid
                container
                direction='row'
                justifyContent='flex-end'
                alignItems='flex-end'
                gap={1}
                mt={2}
              >
                <ButtonComponent
                  variant='contained'
                  OnClick={handleFormSubmit}
                  disabled={!formik.dirty}
                  // sx={{ mt: 3, ml: 1 }}
                  buttonName={'Add Event'}
                />
                <ButtonComponent
                  variant='contained'
                  OnClick={handleCloseModal}
                  // sx={{ mt: 3, ml: 1 }}
                  BGColor={'#d32f2f'}
                  buttonName={'Cancel'}
                />
              </Grid>
            </>
          }
        />
      )}

      {openSubmitModal && (
        <FormModal
          title={'Event'}
          open={openSubmitModal}
          onClose={() => setOpenSubmitModal(false)}
          formComponent={
            <div>
              <Typography variant='h4'>Event Added Successfully!</Typography>
              <p>Do you like to Email this event to Employee.</p>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  marginTop: '1rem',
                }}
              >
                <ButtonComponent
                  variant='contained'
                  sx={{ mt: 3, ml: 1 }}
                  OnClick={handleEmailButtonClick}
                  buttonName={'Yes'}
                />
                <ButtonComponent
                  variant='contained'
                  OnClick={() => {
                    setOpenSubmitModal(false);
                  }}
                  sx={{ mt: 3, ml: 1 }}
                  BGColor={'#d32f2f'}
                  color='#fff'
                  buttonName={'No'}
                />
              </Box>
            </div>
          }
        />
      )}

      {openEmailModal && (
        <FormModal
          title={'Send Email'}
          open={openEmailModal}
          onClose={() => setOpenEmailModal(false)}
          formComponent={
            <div>
              <EmailToAll
                getEventID={eventId}
                onClose={() => setOpenEmailModal(false)}
              />
            </div>
          }
        />
      )}

      <Grid container spacing={2}>
        {/* <Grid item xs={3}>
          <EventList eventData={eventData}/>
        </Grid> */}
        <Grid item xs={12}>
          <Box sx={{ padding: '2rem' }}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView='dayGridMonth'
              height={'90vh'}
              events={events}
              eventClick={handleOpenModal}
              customButtons={{
                customTodayButton: {
                  text: 'Today',
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {openModal && hasPermission && (
        <OpenEvent
          title={'Edit Event'}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
      {openModal && !hasPermission && (
        <OpenEmpEvent
          title={'Event Details'}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default PermissionHoc(Event);
