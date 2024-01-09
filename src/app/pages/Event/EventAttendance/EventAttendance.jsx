import React, { useEffect, useState } from "react";
import { useGetEventAttenderList } from "../../../hooks/event/useEvent";
import PermissionHoc from "../../../hoc/permissionHoc";
import HocButton from "../../../hoc/hocButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CustomTable from "../../../components/CustomTable/CustomTable";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { EditEventAttendanceModal } from "../EventModal/EventModal";
import NewFilter from "../../../components/NewFilter/NewFilter";
import { useGetAllEvent, usegetAllEmployeeData } from "./useEventAttendance";
import { Badge, Chip, Tooltip, Typography } from "@mui/material";
import { getEventAttenderList } from "../../../api/event/event-api";
import { toast } from "react-toastify";

const EventAttendance = ({ permissions }) => {
  const { employeeData, employeeAllData } = usegetAllEmployeeData();
  const { eventData, eventAllData } = useGetAllEvent();
  const columns = [
    {
      title: "SN",
      field: "tableData.id",
      render: (rowData) => rowData.tableData.id + 1,
      pdfWidth: "2rem",
      width: "3%",
      sortable: false,
      export: false,
      sorting: false,
    },

    {
      title: "Employee Name",
      field: "userName",
      emptyValue: "-",
      pdfWidth: "7rem",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Contact Detail",
      field: "email",
      emptyValue: "-",
      sorting: false,
      render: (rowData) => {
        return (
          <Tooltip title={rowData?.email} placement="top-start" arrow>
            <div
              style={{
                maxWidth: "10rem",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div>{rowData.mobileNumber}</div>
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {rowData.email}
              </div>
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Email",
      field: "email",
      pdfWidth: "7rem",
      hidden: true,
      export: true,
    },
    {
      title: "Event Name",
      field: "eventName",
      emptyValue: "-",
      pdfWidth: "8rem",
      width: "20vh",

      sorting: false,
    },
    {
      title: "Date",
      field: "eventDate",
      emptyValue: "-",
      pdfWidth: "7rem",
      sorting: false,
    },
    {
      title: "Time",
      field: "eventTime",
      emptyValue: "-",
      pdfWidth: "4rem",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Location",
      field: "eventLocation",
      emptyValue: "-",
      pdfWidth: "5rem",
      width: "20vh",

      sorting: false,
    },
    {
      title: "Description",
      field: "eventDescription",
      emptyValue: "-",
      pdfWidth: "10rem",
      width: "20vh",
      sorting: false,
    },
    {
      title: "User Confirmation",
      field: "status",
      emptyValue: "-",
      sorting: false,
      pdfWidth: "4rem",
      align: "center",
      render: (rowData) => {
        if (rowData?.status === "OK") {
          return <Chip color="success" label="Coming" />;
        } else
          return (
            <Chip
              color="error"
              sx={{ pdfWidth: "max-content" }}
              label="Not Coming"
            />
          );
      },
    },
    {
      title: "Attended",
      field: "isPresent",
      render: (rowData) => {
        if (rowData?.isPresent) {
          return (
            <div>
              <Badge color="success" badgeContent="Yes" />
            </div>
          );
        } else
          return (
            <div>
              <Badge color="error" badgeContent="No" />
            </div>
          );
      },
      emptyValue: "-",
      pdfWidth: "5rem",
      width: "20vh",

      sorting: false,
      align: "center",
    },
  ].filter(Boolean);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedEventAttendance, setEditedEventAttendance] = useState({});
  const [additionalLeft, setAdditionalLeft] = useState({});
  const [additionalRight, setAdditionalRight] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const [tableData, setTableData] = useState([]);

  const handleEditEventAttendance = (rowData) => {
    setEditedEventAttendance(rowData);
    setOpenEditModal(true);
  };

  const filterMenu = [
    {
      label: "Event",
      name: "eventId",
      type: "autoComplete",
      options: eventData || [],
      md: 6,
      sm: 6,
      xs: 6,
    },
    {
      label: "Employee",
      name: "employeeId",
      type: "autoComplete",
      options: employeeData || [],
      md: 6,
      sm: 6,
      xs: 6,
    },
  ];

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: "black",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),

      disabled: !permissions?.canEdit,

      tooltip: "Edit Event",
      onClick: (event, rowData) => handleEditEventAttendance(rowData),
    },

  ];

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (values) => {
    setisLoading(true);
    setSearchParams({ ...values });
    try {
      const data = await getEventAttenderList({ ...values });
      setisLoading(false);
      setTableData(data?.events);
      if (values?.employeeId || (values?.employeeId && values?.eventId)) {
        const additionalData = employeeAllData?.find(
          (d) => d.id === values?.employeeId
        );
        setAdditionalLeft({
          "Employee Name": employeeData?.find(
            (d) => d.id === values?.employeeId
          )?.label,
          Email: additionalData?.officeEmail,
        });
        setAdditionalRight({ "Contact No.": additionalData?.mobileNumber });
      } else if (values?.eventId) {
        const additionalData = eventAllData?.find(
          (d) => d.id === values?.eventId
        );
        setAdditionalLeft({
          Event: additionalData?.eventName,
          Location: additionalData?.eventLocation,
          "Event Description": additionalData?.eventDescription,
        });
        setAdditionalRight({
          Date: additionalData?.eventDate,
          Time: additionalData?.eventTime,
        });
      } else {
        setAdditionalLeft({});
        setAdditionalRight({});
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <NewFilter inputField={filterMenu} searchCallBack={handleSearch} />
      <CustomTable
        columns={getColumns(columns, searchParams)}
        data={tableData}
        title="Event Attendance Report"
        isLoading={isLoading}
        additionalLeft={additionalLeft}
        additionalRight={additionalRight}
        fileName="Event Report"
        actions={actions}
        exportButton
        exportExcel
        singleAction={true}
      />
      {openEditModal && (
        <EditEventAttendanceModal
          title={"Edit Event Attendance"}
          data={editedEventAttendance}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

const getColumns = (column, searchParams) => {
  if (searchParams?.employeeId && searchParams?.eventId) {
    return column?.filter(
      (d) =>
        d.field !== "userName" &&
        d.field !== "mobileNumber" &&
        d.field !== "email" &&
        d.field !== "branch"
    );
  } else if (searchParams?.employeeId) {
    return column?.filter(
      (d) =>
        d.field !== "userName" &&
        d.field !== "mobileNumber" &&
        d.field !== "email" &&
        d.field !== "branch"
    );
  } else if (searchParams?.eventId) {
    return column?.filter(
      (d) =>
        d.field !== "eventName" &&
        d.field !== "eventLocation" &&
        d.field !== "eventDate" &&
        d.field !== "eventTime" &&
        d.field !== "eventDescription"
    );
  } else return column;
};

export default PermissionHoc(EventAttendance);
