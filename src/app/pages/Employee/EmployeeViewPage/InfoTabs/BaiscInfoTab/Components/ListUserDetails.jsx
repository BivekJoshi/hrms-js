import { Box, Button, List, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";

import InfoItem from "./InfoItem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useNavigate } from "react-router-dom";
import { useGetLoggedInUser } from "../../../../../../hooks/auth/usePassword";
import useAuth from "../../../../../../../auth/hooks/component/login/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListUserDetails({ cardTitle, data, mode }) {
  const {
    isSuperAdmin,
    isAdmin,
    isHr,
    isEmployee,
    isHrAdmin,
    isManager,
  } = useAuth();

  const { id } = useParams();

  const { data: loggedInUserData } = useGetLoggedInUser();

  const navigate = useNavigate();

  const handleOnClick = () => {
    if (isAdmin || isSuperAdmin || isHr || isManager || isHrAdmin) {
      navigate(`/admin/employee/edit/${id}`);
    } else {
      navigate(`/employee/employee/edit/${loggedInUserData?.employeeId}`);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {cardTitle}
        </Typography>
        <Stack sx={{ display: "flex", alignItems: "center" }}>
          {!isEmployee && (cardTitle === 'Basic Informations') && (
            <BorderColorIcon
              onClick={handleOnClick}
              fontSize="large"
              sx={{ color: "rgb(28, 126, 214)", paddingRight: "1rem" }}
            />
          )}
        </Stack>
        {/* 
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Basic Info Details
            </Typography>
            <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
          </Box>
        </Modal> */}
      </Box>
      <List
        sx={{
          bgcolor: mode === "light" ? "#ededed" : "#3f413f",
          borderRadius: "1rem",
        }}
      >
        {Object.keys(data)?.map((item, index) => (
          <InfoItem key={index} field={item} value={data[item]} />
        ))}
      </List>
    </>
  );
}
