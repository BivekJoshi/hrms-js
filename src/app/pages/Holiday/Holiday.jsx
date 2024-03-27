import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
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

  // const handleColorChange = (e) => {
  //   const lastColumn = document.getElementsByClassName("fc-daygrid-day-frame");
  //   if (lastColumn) {
  //     let colIndex = [];
  //     for (let i = 6; i < lastColumn.length; i += 7) {
  //       colIndex.push(i);
  //     }
  //     for (j = 1 ; j < e.view.dateEnv.locale.week.doy < 5 ; j++) {

  //   }
  // };

  const handleColorChange = () => {
    const lastColumn = document.getElementsByClassName("fc-daygrid-day-frame");
    if (lastColumn) {
      for (let i = 6; i < lastColumn.length; i += 7) {
        lastColumn[i].style.background = "#fd5d5d";
      }
    }
  };

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

  const handleCloseModal = () => {
    setOpenAddModal(false);
    formik.handleReset();
  };
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
            buttonName={"Add Holiday"}
          />
        </Box>
      )}
      <br />
      <HolidayFields
        formik={formik}
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        handleFormSubmit={handleFormSubmit}
        handleCloseModal={handleCloseModal}
      />

      {openSubmitModal && (
        <FormModal
          title={"Holiday"}
          open={openSubmitModal}
          onClose={() => setOpenSubmitModal(false)}
          formComponent={
            <div>
              <Typography variant="h5">Holiday Added Successfully!</Typography>
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
        eventClick={handleOpenModal}
        height={"90vh"}
        datesSet={handleColorChange}
        events={events}
        customButtons={{
          customTodayButton: {
            text: "Today",
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
      <style>
        {`
         .fc .fc-daygrid-day.fc-day-today {
             background-color: #90a7bd;
         }
         .fc *{
          text-align: center;
          justify-content: center;
          }
           .fc .fc-daygrid-day.fc-day-today {
               background-color: #90a7bd;
           }
            .fc-col-header, .fc-scrollgrid-sync-table{
              width: 100% !important;
            }
            .fc-daygrid-body, .fc-daygrid-body-unbalanced {
              width: 100% !important;
            }import { getAddressById } from './../../api/address/address-api';

         `}
      </style>
    </>
  );
};

export default PermissionHoc(Holiday);
