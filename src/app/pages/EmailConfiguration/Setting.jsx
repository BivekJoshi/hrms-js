import { Box, Tab } from "@mui/material";
import React from "react";
import EmailConfiguration from "./Component/EmailConfiguration";
import ChangeEmail from "./Component/ChangeEmail";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PathConfiguration from "./Component/PathConfiguration";
import PermissionHoc from "../../hoc/permissionHoc";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const Setting = ({ permissions }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { mode, palette } = React.useContext(ThemeModeContext);

  const labelStyle = {
    backgroundColor: palette.secondary.main,
    marginLeft: ".5rem",
    textTransform: "none",
    borderRadius: ".5rem",
    color: mode === "light" ? "black" : "white",
    textDecoder: "none",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor:
      mode === "dark" ? palette.text.primary : palette.secondary.light,
    borderBottom: "none",
    textDecoder: "none",
    color: mode === "dark" ? "black" : "white",
  };

  return (
    <TabContext value={value}>
      <Box>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          indicatorColor="none"
        >
          <Tab
            label="Email Configuration"
            value="1"
            style={value === "1" ? activeLabelStyle : labelStyle}
          />
          <Tab
            label="Change Email"
            value="2"
            style={value === "2" ? activeLabelStyle : labelStyle}
          />
          <Tab
            label="Path Configuration"
            value="3"
            style={value === "3" ? activeLabelStyle : labelStyle}
          />
        </TabList>
      </Box>

      <TabPanel value="1">
        <EmailConfiguration permissions={permissions} />
      </TabPanel>
      <TabPanel value="2">
        <ChangeEmail permissions={permissions} />
      </TabPanel>
      <TabPanel value="3">
        <PathConfiguration permissions={permissions} />
      </TabPanel>
    </TabContext>
  );
};

export default PermissionHoc(Setting);
