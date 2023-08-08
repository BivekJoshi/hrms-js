import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Users from "./Users/Users";
import Roles from "./Roles/Roles";
import Permission from "./Permission/Permission";

const UserController = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{ bgcolor: "background.paper", width: "100%", marginTop: "1rem" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          centered
        >
          <Tab value="one" label="Users" sx={{ fontWeight: "600", fontSize: "1.4rem" }} />
          <Tab value="two" label="Role" sx={{ fontWeight: "600", fontSize: "1.4rem" }} />
          <Tab value="three" label="Permission" sx={{ fontWeight: "600", fontSize: "1.4rem" }} />
        </Tabs>
        {value === "one" && ( <Box> <Users /></Box> )}
        {value === "two" && <Box> <Roles /> </Box>}
        {value === "three" && <Box> <Permission /> </Box>}
      </Box>
    </>
  );
};

export default UserController;
