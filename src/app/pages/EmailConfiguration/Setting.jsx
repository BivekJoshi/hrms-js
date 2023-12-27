import { Box, Tab } from "@mui/material";
import React from "react";
import EmailConfiguration from "./Component/EmailConfiguration";
import ChangeEmail from "./Component/ChangeEmail";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Setting = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab
          label="Email Configuration"
          value="1"
          style={{
            fontSize: "1rem",
            // color: primaryColor,
            fontWeight: "bolder",
          }}
        />
        <Tab
          label="Change Email"
          value="2"
          style={{
            fontSize: "1rem",
            // color: primaryColor,
            fontWeight: "bolder",
          }}
        />
      </TabList>
      <TabPanel value="1">
        <EmailConfiguration />
      </TabPanel>
      <TabPanel value="2">
        <ChangeEmail />
      </TabPanel>
    </TabContext>
  );
};

export default Setting;