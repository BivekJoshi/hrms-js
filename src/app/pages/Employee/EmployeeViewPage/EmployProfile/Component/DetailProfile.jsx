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
import PromotionHistory from "../../InfoTabs/PromotionHistory/PromotionHistory";
import EmployeeHistory from "../../InfoTabs/EmployeeHistoryTab/EmployeeHistory";

const primaryColor = "#1c7ed6";

export const DetailProfile = ({ data, role, setShowPersonalProfile }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log("hi" +role);
  const tabsData = [
    {
      label: "Leave Records",
      value: "1",
      component: <LeaveInfo data={data} role={role} />,
    },
    {
      label: "Academics",
      value: "2",
      component: <AcademicsInfo data={data} role={role} />,
    },
    {
      label: "Attendance",
      value: "3",
      component: <AttendenceInfo data={data} role={role} />,
    },
    {
      label: "Position History",
      value: "4",
      component: <PromotionHistory data={data} role={role} />,
    },
    {
      label: "Employee History",
      value: "5",
      component: <EmployeeHistory data={data} role={role} />,
    },
    {
      label: "Training",
      value: "6",
      component: <TrainingInfo data={data} role={role} />,
    },
    {
      label: "Documents",
      value: "7",
      component: <DocumentInfo data={data} role={role} />,
    },
  ];

  const handleClick = (clickedTab) => {
    if (clickedTab === "showPersonalProfile") {
      setShowPersonalProfile(true);
    } else {
      setShowPersonalProfile(false);
    }
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
                {tabsData.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    onClick={() => handleClick(tab.value)}
                    style={{
                      fontSize: "1rem",
                      color: primaryColor,
                      fontWeight: "bolder",
                    }}
                  />
                ))}
              </Tabs>
            </TableHead>
          </Table>
        </TableContainer>
        <Box>
          {tabsData.map((tab) => (
            <TabPanel key={tab.value} value={tab.value} style={{ padding: 10 }}>
              {tab.component}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};