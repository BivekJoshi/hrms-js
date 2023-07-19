import React from "react";
import { Box, Tab, Table, TableCell, Tabs } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import BasicInfo from "./BasicInfo";
import LeaveInfo from "../../InfoTabs/LeaveInfoTab/LeaveInfo";
import AcademicsInfo from "../../InfoTabs/AcademicsInfoTab/AcademicsInfo";
import PromotionHistory from "../../InfoTabs/PromotionHistory/PromotionHistory";
import "../Style/Style.css";

const primaryColor = "#1c7ed6";

export const DetailProfile = ({ data }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
        {/* <Box className="infoStyle" minHeight={"400px"}> */}
        <TableContainer sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Table aria-label="simple table">
            <TableHead>
              <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="tableAlignment"
              >
                {/* <Tab label={<PersonalProfile/>}/> */}
                {/* <Tab
                  label="Basic Info"
                  value="1"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                /> */}
                <Tab
                  label="Leave Records"
                  value="1"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Academics"
                  value="3"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                {/* <Tab
                            label='Experiences'
                            value='4'
                            style={{
                                fontSize: '1rem',
                                color: primaryColor,
                                fontWeight: 'bolder',
                            }}
                        /> */}
                <Tab
                  label="Promotion History"
                  value="5"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
              </Tabs>
            </TableHead>
          </Table>
        </TableContainer>
        <Box>
          {/* <TabPanel value="1" style={{ padding: 10 }}>
            <BasicInfo data={data}/>
          </TabPanel> */}
          <TabPanel value="1" style={{ padding: 10 }}>
            <LeaveInfo data={data}/>
          </TabPanel>
          <TabPanel value="3" style={{ padding: 10 }}>
            <AcademicsInfo data={data} />
          </TabPanel>
          <TabPanel value="4" style={{ padding: 10 }}>
            <AcademicsInfo data={data} />
          </TabPanel>
          <TabPanel value="5" style={{ padding: 10 }}>
            <PromotionHistory data={data}/>
          </TabPanel>
        </Box>
        {/* </Box> */}
      </TabContext>
    </Box>
  );
};
