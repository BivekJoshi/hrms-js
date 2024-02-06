import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import { OpenEvent } from "./EventModal/EventModal";
import { useDeleteEvent } from "../../hooks/event/useEvent";
import { Box } from "@mui/material";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const EventTableView = ({ eventData, isLoading, permissions }) => {
  const [openModal, setOpenModal] = useState(false);
  const [getEventID, setEventGetID] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mode } = useContext(ThemeModeContext);
  const { deleteEventMutation, isSuccess: isDeleteSuccess } = useDeleteEvent(
    {}
  );
  const handleOpenModal = (rowData) => {
    if (rowData) {
      setEventGetID(rowData?.id);
      setOpenModal(true);
    }
  };
  const handleDeleteEvent = (rowData) => {
    setEventGetID(rowData?.id);
    setOpenDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    deleteEventMutation(getEventID);
    setOpenDeleteModal(false);
  };
  const columns = [
    {
      title: "SN",
      field: "tableData.id",
      width: "1%",
      render: (rowData) => rowData?.tableData?.id + 1,
    },
    {
      title: "Event Name",
      field: "eventName",
      emptyValue: "-",
      width: "80px",
      cellStyle: {
        textAlign: "start",
      },
      sorting: "false",
    },
    {
      title: "Event Date",
      field: "eventDate",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Event Time",
      field: "eventTime",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
      },
    },
    {
      title: "Event Location",
      field: "eventLocation",
      emptyValue: "-",
      width: "80px",
      sorting: "false",
      cellStyle: {
        textAlign: "start",
        whiteSpace: "normal",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-all",
      },
    },
    {
      title: "Event Description",
      field: "eventDescription",
      emptyValue: "-",
      width: "120px",
      cellStyle: {
        textAlign: "start",
      },
      render: (rowData) => (
        <div
          style={{
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {rowData?.eventDescription}
        </div>
      ),
    },
    {
      title: "Actions",
      export: false,
      cellStyle: {
        width: "60px",
      },
      render: (rowData) => {
        return (
          permissions && (
            <div style={{ display: "flex", gap: "12px" }}>
              <div>
                <ModeEditOutlineIcon
                  onClick={() => handleOpenModal(rowData)}
                  sx={{
                    color: mode === "light" ? "black" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                />
              </div>
              <div>
                <DeleteIcon
                  onClick={() => handleDeleteEvent(rowData)}
                  sx={{
                    color: mode === "light" ? "black" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                />
              </div>
            </div>
          )
        );
      },
    },
  ];
  return (
    <>
      <CustomTable
        columns={columns}
        data={eventData}
        title="Event List"
        isLoading={isLoading}
        // actions={actions}
        fileName="Event List"
        exportButton
        exportExcel
        pdfNone
      />

      {openModal && (
        <OpenEvent
          title={"Edit Event"}
          id={getEventID}
          open={openModal}
          hideDelete
          handleCloseModal={() => setOpenModal(false)}
        />
      )}
       {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(false)}
          handleConfirmDelete={handleConfirmDelete}
          message={"Event"}
        />
      )}
    </>
  );
};

export default EventTableView;
