import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import HocButton from "../../hoc/hocButton";
import PermissionHoc from "../../hoc/permissionHoc";

import { useGetHoliday } from "../../hooks/holiday/useHoliday";
import useHolidayForm from "../../hooks/holiday/HolidayForm/useHolidayForm";

import FormModal from "../../components/Modal/FormModal";
import HolidayFields from "../../components/Form/Holiday/HolidayFields";
import EmailForHoliday from "../Email/EmailForHoliday";
import useAuth from "../../../auth/hooks/component/login/useAuth";
import { OpenHoliday } from "./HolidayModal/HolidayModal";

const Holiday = ({ permissions }) => {
  const { isEmployee, isHrClerk } = useAuth();
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [getEventID, setEventGetID] = useState({});

  const { data: holidayData } = useGetHoliday();

  useEffect(() => {
    if (holidayData) {
      const formattedEvents = holidayData.map((event) => ({
        title: event.holidayName,
        date: event.holidayDate,
        description: event?.holidayDescription,
        id: event.id,
      }));
      setEvents(formattedEvents);
    }
  }, [holidayData]);

  const handleCloseModal = () => setOpenAddModal(false);
  const { formik, data } = useHolidayForm(setOpenSubmitModal, handleCloseModal);

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
            buttonName={"+ Add Holiday"}
          />
        </Box>
      )}
      <br />

      {openAddModal && (
        <FormModal
        title={"Add Holiday"}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          formComponent={
            <>
              {/*Import Event Field Here*/}
              <HolidayFields formik={formik} />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  onClick={handleFormSubmit}
                  sx={{ mt: 3, ml: 1, color: "#fff" }}
                >
                  Add Holiday
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
              <h2>Holiday Added Successfully!</h2>
              <p>Do you like to Email this holiday to Employee.</p>
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
              <EmailForHoliday
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
          start: "customTodayButton prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={handleOpenModal}
        height={"90vh"}
        events={events}
        customButtons={{
          customTodayButton: {
            text: "Today",
            // click: function () {
            //   handleTodayClick(events);
            // },
          },
        }}
      />

      {/* {openModal && (
        <OpenHoliday
          id={getEventID}
          open={openModal}
          handleCloseModal={handleCloseModal}
        />
      )} */}

      {openModal && (
        <OpenHoliday
          title={"Edit Holiday"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default PermissionHoc(Holiday);
