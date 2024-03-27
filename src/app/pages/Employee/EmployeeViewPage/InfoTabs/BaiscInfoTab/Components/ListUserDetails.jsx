import {
  Box,
  Button,
  Grid,
  List,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";

import InfoItem from "./InfoItem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUser } from "../../../../../../hooks/auth/usePassword";
import useAuth from "../../../../../../../auth/hooks/component/login/useAuth";

export default function ListUserDetails({ cardTitle, data, mode }) {
  const {
    isSuperAdmin,
    isAdmin,
    isHr,
    isEmployee,
    isHrAdmin,
    isManager,
    isHrClerk,
  } = useAuth();

  const { id } = useParams();

  const { data: loggedInUserData } = useGetLoggedInUser();

  const navigate = useNavigate();

  const handleOnClick = () => {
    if (
      isAdmin ||
      isSuperAdmin ||
      isHr ||
      isManager ||
      isHrAdmin ||
      isHrClerk
    ) {
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
        <Grid sx={{ display: "flex" }}>
          {!isEmployee && cardTitle === "Basic Informations" && (
            <BorderColorIcon
              onClick={handleOnClick}
              fontSize="large"
              sx={{
                color: "rgb(28, 126, 214)",
                paddingRight: "1rem",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>
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
