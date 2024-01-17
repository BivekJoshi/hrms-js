import { Button, Divider, Grid, Menu, MenuItem, Popover } from "@mui/material";
import { MenuList, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import "./style.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../auth/axiosInterceptor";
import { useGetPendingLeave } from "../../../hooks/leave/useLeave";

export const LeaveNotification = ({ Eventname, open, handleListKeyDown }) => {
  const { mode } = useContext(ThemeModeContext);

  const { data: leaveData, refetch: refetchLeaveData } = useGetPendingLeave();

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const handlePopoverOpen = (ename) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(ename);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleLeaveAction = async (action) => {
    const requestBody = {
      id: selectedItem?.id,
      leaveStatus: action,
    };
    try {
      const response = await axiosInstance.put(
        `/leave/confirm/${selectedItem?.id}`,
        requestBody
      );
      toast.success("Leave request successfully updated.");
      refetchLeaveData();
    } catch (error) {
      toast.error(error);
    } finally {
      handlePopoverClose();
    }
  };

  // requested date
  const getTimeDifference = (dateString) => {
    const currentDate = new Date();
    const requestedDate = new Date(dateString);

    const timeDifference = currentDate - requestedDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };
  return leaveData?.length > 0 ? (
    <Grid
      sx={{
        textAlign: "center",
        maxHeight: "20rem",
        overflowY: "scroll",
        padding: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={handleListKeyDown}
        sx={{
          textAlign: "center",
          padding: "0.5rem 1rem",
        }}
      >
        <Typography variant="h6" color="primary" fontWeight={400}>
          {Eventname}
        </Typography>
        {leaveData &&
          leaveData?.map((ename, index) => (
            <Grid
              key={index}
              display="flex"
              flexDirection="column"
              gap={1}
              mb=" .8rem"
              backgroundColor={mode === "light" ? "#F7F8F9" : "#3e3e3e"}
              textAlign="left"
              p={1}
            >
              <Grid display="flex" flexDirection="column" p="8px 8px 0 8px">
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography
                    width="10rem"
                    fontSize="14px"
                    textAlign="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {ename.leaveType.leaveName + " "}
                    </span>
                    Leave Applied
                  </Typography>
                  <MoreHorizIcon onClick={handlePopoverOpen(ename)} />
                </Grid>
                <Divider />
              </Grid>

              <Grid width="13rem" p="8px 8px 0 8px">
                <Typography fontSize="12px">
                  <span style={{ textTransform: "capitalize" }}>
                    {ename.employee.firstName}{" "}
                    {" " + ename.employee.middleName + " " || ""}
                    {ename.employee.lastName}
                  </span>
                  has requested a
                  <span style={{ textTransform: "capitalize" }}>
                    {" " + ename.leaveType.leaveName + " "}
                  </span>
                  leave for
                  <span>
                    {ename.applyLeaveDays === 0.5
                      ? " " + "half" + " "
                      : " " + ename.applyLeaveDays + " "}
                  </span>
                  {ename.applyLeaveDays > 1 ? " days." : "day."}
                </Typography>
                <Typography fontSize="12px">
                  From: {formatDate(ename.fromDate)} -{" "}
                  {formatDate(ename.toDate)}
                </Typography>
              </Grid>
              <Typography
                fontSize="12px"
                color={mode === "light" ? "#7A757F" : ""}
                p="8px 8px 0 8px"
              >
                Requested :{getTimeDifference(ename.createdDate || "")}
              </Typography>
            </Grid>
          ))}
        {selectedItem && (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={anchorEl}
            onClose={() => setAnchorEl(false)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleLeaveAction("APPROVED")}>
              Approve
            </MenuItem>
            <MenuItem onClick={() => handleLeaveAction("REJECTED")}>
              Rejected
            </MenuItem>
          </Menu>
        )}
      </MenuList>
      <style>{`
        .css-16w8ql3-MuiPaper-root-MuiPopover-paper{
            box-shadow:2px 2px 5px rgba(0,0,0,0.1) !important;
            background:#e4eaf5;
          }
          .css-q4t2qk-MuiPaper-root-MuiPopover-paper{
            box-shadow:2px 2px 5px rgba(0,0,0,0.1) !important;
            background:#171818;
          }
          .css-15w7trx-MuiList-root{
            padding: .5rem !important
          }
          `}</style>
    </Grid>
  ) : null;
};
