import React from "react";
import { Box, Tab, Table, Tabs } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import LeaveInfo from "../../InfoTabs/LeaveInfoTab/LeaveInfo";
import AcademicsInfo from "../../InfoTabs/AcademicsInfoTab/AcademicsInfo";
import "../Style/Style.css";
import AttendenceInfo from "../../InfoTabs/AttendenceInfoTab/AttendenceInfo";
import DocumentInfo from "../../InfoTabs/DocumentInfoTab/DocumentInfo";
import TrainingInfo from "../../InfoTabs/TrainingInfoTab/TrainingInfo";
import PromotionHistory from '../../InfoTabs/PromotionHistory/PromotionHistory';
import EmployeeHistory from '../../InfoTabs/EmployeeHistoryTab/EmployeeHistory';

const primaryColor = "#1c7ed6";

export const DetailProfile = ({ data, role }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ typography: "body1"}}>
      
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
                  value="2"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label='Attendence'
                  value='3'
                  style={{
                    fontSize: '1rem',
                    color: primaryColor,
                    fontWeight: 'bolder',
                  }}
                />
                <Tab
                  label="Position History"
                  value="4"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                 <Tab
                  label="Work History"
                  value="5"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Training"
                  value="6"
                  style={{
                    fontSize: "1rem",
                    color: primaryColor,
                    fontWeight: "bolder",
                  }}
                />
                <Tab
                  label="Documents"
                  value="7"
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
            <LeaveInfo data={data} role={role} />
          </TabPanel>
          <TabPanel value="2" style={{ padding: 10 }}>
            <AcademicsInfo data={data} role={role}  />
          </TabPanel>
          <TabPanel value="3" style={{ padding: 10 }}>
            <AttendenceInfo data={data} role={role}  />
          </TabPanel>
          <TabPanel value="4" style={{ padding: 10 }}>
            <PromotionHistory data={data} role={role}  />
          </TabPanel>
          <TabPanel value="5" style={{ padding: 10 }}>
            <EmployeeHistory data={data} role={role}  />
          </TabPanel>
          <TabPanel value="6" style={{ padding: 10 }}>
            <TrainingInfo data={data} role={role} />
          </TabPanel>
          <TabPanel value="7" style={{ padding: 10 }}>
            <DocumentInfo data={data} role={role} />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};