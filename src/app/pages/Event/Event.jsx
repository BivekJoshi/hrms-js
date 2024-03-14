import React, { useState, useRef, useEffect } from "react";
import { Box, Grid, Tab, Typography } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetEvent } from "../../hooks/event/useEvent";
import useEventForm from "../../hooks/event/EventForm/useEventForm";
import { OpenEmpEvent, OpenEvent } from "./EventModal/EventModal";
import EmailToAll from "../Email/EmailToAll";

import HocButton from "../../hoc/hocButton";
import PermissionHoc from "../../hoc/permissionHoc";

import FormModal from "../../components/Modal/FormModal";
import AddEventFields from "../../components/Form/Event/AddEventFields";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EventTableView from "./EventTableView";

const Event = ({ permissions }) => {
  const { mode, palette } = React.useContext(ThemeModeContext);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = React.useState("1");

  const [getEventID, setEventGetID] = useState({});

  const { data: eventData, isLoading } = useGetEvent();

  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: ".5rem",
    textTransform: "none",
    borderRadius: ".5rem",
    color: mode === "light" ? "black" : "white",
    textDecoder: "none",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === "dark" ? palette.text.primary : palette.secondary.light,
    borderBottom: "none",
    textDecoder: "none",
    color: mode === "dark" ? "black" : "white",
  };

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

  const handleCloseModal = () => {
    setOpenAddModal(false);
    formik.handleReset();
  };
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hasPermission = permissions?.canEdit;
  return (
    <>
      {openAddModal && (
        <FormModal
          title={"Add Event"}
          open={openAddModal}
          onClose={() => {
            setOpenAddModal(false);
            formik.handleReset();
          }}
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
              <Typography variant="h5">Event Added Successfully!</Typography>
              <p>Do you like to Email this event to Employee.</p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
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
                getEventID={eventId}
                onClose={() => setOpenEmailModal(false)}
              />
            </div>
          }
        />
      )}

      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              indicatorColor="none"
            >
              <Tab
                label="Calendar View"
                value="1"
                style={value === "1" ? activeLabelStyle : labelStyle}
              />
              <Tab
                label="Table View"
                value="2"
                style={value === "2" ? activeLabelStyle : labelStyle}
              />
            </TabList>
            <Box sx={{ display: "flex", gap: "12px" }}>
              <HocButton
                permissions={permissions?.canAdd}
                color={"#fff"}
                variant={"contained"}
                onClick={() => setOpenAddModal(true)}
                buttonName={"Add Event"}
              />
            </Box>
          </Box>

          <TabPanel value="1" sx={{ padding: "0" }}>
            <br />
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height={"90vh"}
              events={events}
              eventClick={handleOpenModal}
              customButtons={{
                customTodayButton: {
                  text: "Today",
                },
              }}
            />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0" }}>
            <br />
            <EventTableView
              eventData={eventData}
              isLoading={isLoading}
              permissions={hasPermission}
            />
          </TabPanel>
        </Box>
      </TabContext>
      <style>
        {`
         .fc .fc-daygrid-day.fc-day-today {
             background-color: #90a7bd;
         }
         .fc *{
          text-align: center;
          justify-content: center;
          }
          .fc-col-header, .fc-scrollgrid-sync-table{
            width: 100% !important;
          }
          .fc-daygrid-body, .fc-daygrid-body-unbalanced {
            width: 100% !important;
          }
         `}
      </style>

      {openModal && hasPermission && (
        <OpenEvent
          title={"Edit Event"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
      {openModal && !hasPermission && (
        <OpenEmpEvent
          title={"Event Details"}
          id={getEventID}
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default PermissionHoc(Event);
