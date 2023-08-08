import React from "react";
import { useParams } from "react-router-dom";
import { useGetDocumentById } from "../../../../../hooks/employee/useDocument";
import { DOC_URL } from "../../../../../../auth/axiosInterceptor";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { groupBy } from "lodash";

const DocumentInfo = () => {
  const url = DOC_URL;
  const { id } = useParams();
  const { data: getDocument, isLoading } = useGetDocumentById(id);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const groupedDocuments = isLoading ? {} : groupBy(getDocument, "documentType");

  return (
    // {data?():()}
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {isLoading ? (
              <p>Loding..</p>
            ) : (
              Object.keys(groupedDocuments).map((documentType, index) => (
                <Tab
                  key={index}
                  label={documentType}
                  value={documentType}
                />
              ))
            )}
          </TabList>
        </Box>
        {isLoading ? (
          <TabPanel value="1">Loading...</TabPanel>
        ) : (
          Object.keys(groupedDocuments).map((documentType) => (
            <TabPanel key={documentType} value={documentType} sx={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"1rem"}}>
              {groupedDocuments[documentType].map((document) => (
                <img
                  key={document.id}
                  src={`${url}${document?.path}`}
                  alt="Document"
                  width="100%"
                  // height="340"
                />
              ))}
            </TabPanel>
          ))
        )}
      </TabContext>
    </Box>
  );
};

export default DocumentInfo;
