import { Button, Divider, Grid, Popover } from "@mui/material";
import { MenuList, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ThemeModeContext from "../../../../theme/ThemeModeContext";
import "./style.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-toastify";
import axios from "axios";
import { useGetLeave, useGetleaveOfUser } from "../../../hooks/leave/useLeave";
import { axiosInstance } from "../../../../auth/axiosInterceptor";

export const LeaveNotification = ({
  Eventname,
  data,
  open,
  onClose,
  onLeaveConfirmation,
  handleListKeyDown,
}) => {
  const { mode } = useContext(ThemeModeContext); // Accessing mode from context
  const [leaveData, setLeaveData] = useState([]);
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  //popoverapprove and reject
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);

  //api call for approve and reject
  const handleLeaveAction = async (leaveId, action, leaveRemarks) => {
    const requestBody = {
      id: leaveId,
      leaveStatus: action,
      leaveRemarks: leaveRemarks || "",
    };
    try {
      await axiosInstance.put(`/leave/confirm/${leaveId}`, requestBody);
      toast.success("Confirm leave successfully updated.");
      if (onLeaveConfirmation) {
        onLeaveConfirmation();
      }
    } catch (error) {
      toast.error("Failed to confirm leave.");
    } finally {
      handlePopoverClose();
      if (onClose) {
        onClose();
      }
    }
  };
  const handelsubmit = (leaveId, action) => {
    // Assuming leaveId and leaveRemarks are defined in your component state or props
    handleLeaveAction(leaveId, action);
  };

  return (
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
        {data &&
          data?.map((ename, index) => (
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
                    fontSize="14px"
                    style={{ textTransform: "capitalize" }}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {ename.leaveType.leaveName + " "}
                    </span>
                    Leave Applied
                  </Typography>
                  <MoreHorizIcon onClick={handlePopoverOpen} />
                  <Popover
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                  >
                    <Grid display="flex" flexDirection="column">
                      <Button
                        onClick={() => handelsubmit(ename.id, "APPROVED")}
                        sx={{ color: mode === "light" ? "black" : "white" }}
                      >
                        Approve
                      </Button>
                      <Divider />
                      <Button
                        onClick={() => handelsubmit(ename.id, "REJECTED")}
                        sx={{ color: mode === "light" ? "black" : "white" }}
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Popover>
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
                  days.
                </Typography>
                <Typography fontSize="12px">
                  From: {formatDate(ename.fromDate)} -{formatDate(ename.toDate)}
                </Typography>
              </Grid>
              <Typography
                fontSize="12px"
                color={mode === "light" ? "#7A757F" : ""}
                p="8px 8px 0 8px"
              >
                Requested :
              </Typography>
            </Grid>
          ))}
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
  );
};
