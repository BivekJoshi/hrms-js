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
import { Badge, Chip, Typography } from "@mui/material";
import { getEventAttenderList } from "../../../api/event/event-api";
import { toast } from "react-toastify";

const EventAttendance = ({ permissions }) => {
  const { employeeData } = usegetAllEmployeeData();
  const { eventData } = useGetAllEvent();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedEventAttendance, setEditedEventAttendance] = useState({});
  const handleCloseEditModal = () => setOpenEditModal(false);
  const [filterState, setFilterState] = useState("");
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

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },

    {
      title: "Employee Name",
      field: "userName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Branch",
      field: "branch",
      emptyValue: "-",
      sortable: false,
      sorting: false,
    },
    {
      title: "Contact Detail",
      field: "mobileNumber",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
      render: (rowData) => {
        return (
          <div>
            <div>{rowData.mobileNumber}</div>
            <div>{rowData.email}</div>
          </div>
        );
      },
    },
    {
      title: "Email",
      field: "email",
      hidden: true,
      export: true,
    },
    {
      title: "Event Name",
      field: "eventName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Date",
      field: "eventDate",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Time",
      field: "eventTime",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Location",
      field: "eventLocation",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Description",
      field: "eventDescription",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "User Confirmation",
      field: "status",
      emptyValue: "-",
      sorting: false,
      align: "center",
      render: (rowData) => {
        if (rowData?.status === "OK") {
          return <Chip color="success" label="Coming" />;
        } else
          return (
            <Chip
              color="error"
              sx={{ width: "max-content" }}
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
      width: "20vh",
      sorting: false,
      align: "center",
    },
  ].filter(Boolean);

  const actions = [
    {
      icon: () => (
        <HocButton
          permissions={permissions.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: "Edit Event",
      onClick: (event, rowData) => handleEditEventAttendance(rowData),
    },
  ];

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (values) => {
    setisLoading(true);
    try {
      const data = await getEventAttenderList({ ...values });
      setisLoading(false);
      setTableData(data?.events);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <NewFilter inputField={filterMenu} searchCallBack={handleSearch} />
      <CustomTable
        columns={columns}
        data={tableData}
        title="Event Attendance Data"
        isLoading={isLoading}
        actions={actions}
        exportButton
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

export default PermissionHoc(EventAttendance);
