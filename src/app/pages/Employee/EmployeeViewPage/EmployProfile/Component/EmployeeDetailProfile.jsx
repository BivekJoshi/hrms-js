import React from "react";
import { Box, Tab, Table, Tabs } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import AcademicsInfo from "../../InfoTabs/AcademicsInfoTab/AcademicsInfo";
import PromotionHistory from "../../InfoTabs/PromotionHistory/PromotionHistory";
import "../Style/Style.css";
import DocumentInfo from "../../InfoTabs/DocumentInfoTab/DocumentInfo";
import TrainingInfo from "../../InfoTabs/TrainingInfoTab/TrainingInfo";

const primaryColor = "#1c7ed6";

export const EmployeeDetailProfile = ({ data }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
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
                <Tab
                  label="Academics"
                  value="1"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Promotion History"
                  value="2"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Training"
                  value="3"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Documents"
                  value="4"
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
          <TabPanel value="1" style={{ padding: 10 }}>
            <AcademicsInfo data={data} />
          </TabPanel>
          <TabPanel value="2" style={{ padding: 10 }}>
            <PromotionHistory data={data} />
          </TabPanel>
          <TabPanel value="3" style={{ padding: 10 }}>
            <TrainingInfo data={data}/>
          </TabPanel>
          <TabPanel value="4" style={{ padding: 10 }}>
            <DocumentInfo />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};