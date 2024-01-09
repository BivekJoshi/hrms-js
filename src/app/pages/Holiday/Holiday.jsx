import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

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
import { OpenEmpHoliday, OpenHoliday } from "./HolidayModal/HolidayModal";
import { ButtonComponent } from "../../components/Button/ButtonComponent";

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
        title: event?.holidayName,
        date: event?.holidayDate,
        description: event?.holidayDescription,
        id: event.id,
      }));
      setEvents(formattedEvents);
    }
  }, [holidayData]);

  const handleCloseModal = () => setOpenAddModal(false);
  const { formik, holidayId } = useHolidayForm(
    setOpenSubmitModal,
    handleCloseModal
  );

  const handleFormSubmit = () => {
    formik.handleSubmit();
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
                gap={1}
                mt={2}
              >
                <ButtonComponent
                  variant="contained"
                  OnClick={handleFormSubmit}
                  sx={{ mt: 3, ml: 1, color: "#fff" }}
                  buttonName={"Add Holiday"}
                />
                <ButtonComponent
                  variant="contained"
                  OnClick={handleCloseModal}
                  sx={{ mt: 3, ml: 1 }}
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
          title={"Holiday"}
          open={openSubmitModal}
          onClose={() => setOpenSubmitModal(false)}
          formComponent={
            <div>
              <Typography variant="h4">Holiday Added Successfully!</Typography>
              <p>Do you like to Email this holiday to Employee.</p>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonComponent
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  OnClick={handleEmailButtonClick}
                  buttonName={"Yes"}
                />
                <ButtonComponent
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  OnClick={() => {
                    setOpenSubmitModal(false);
                  }}
                  buttonName={"No"}
                  BGColor={"#d32f2f"}
                />
                {/* <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1, color: "#fff" }}
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
                </Button> */}
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
              <EmailForHoliday
                getEventID={holidayId}
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
        // headerToolbar={{
        //   start: "customTodayButton prev,next",
        //   center: "title",
        //   end: "dayGridMonth,timeGridWeek,timeGridDay",
        // }}
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

      {openModal && hasPermission && (
        <OpenHoliday
          title={"Edit Holiday"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
      {openModal && !hasPermission && (
        <OpenEmpHoliday
          title={"Holiday Details"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default PermissionHoc(Holiday);
