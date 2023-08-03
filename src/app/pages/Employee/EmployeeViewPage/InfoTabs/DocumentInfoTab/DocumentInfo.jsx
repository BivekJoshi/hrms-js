import React from "react";
import { useParams } from "react-router-dom";
import { useGetDocumentById } from "../../../../../hooks/employee/useDocument";
import { DOC_URL } from "../../../../../../auth/axiosInterceptor";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const DocumentInfo = () => {
  const url = DOC_URL;
  const { id } = useParams();
  const { data: getDocument, isLoading } = useGetDocumentById(id);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext 
      value={value}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {isLoading ? (
              <Tab label="Loading..." value="1" />
            ) : (
              getDocument.map((document) => (
                <Tab
                  key={document.id}
                  label={document.documentType} 
                  value={document.id.toString()} 
                />
              ))
            )}
          </TabList>
        </Box>
        {isLoading ? (
          <TabPanel value="1">Loading...</TabPanel>
        ) : (
          getDocument.map((document) => (
            <TabPanel key={document.id} value={document.id.toString()}>
              <img
                src={`${url}${document?.path}`}
                alt="Document"
                width="640"
                height="340"
              />
            </TabPanel>
          ))
        )}
      </TabContext>
    </Box>
  );
};

export default DocumentInfo;
