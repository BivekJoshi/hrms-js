import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetDocumentById } from "../../../../../hooks/employee/useDocument";
import { DOC_URL } from "../../../../../../auth/axiosInterceptor";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { groupBy } from "lodash";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import { useGetLoggedInUserInfo } from "../../../../../hooks/employee/useEmployee";

const DocumentInfo = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  // console.log(loggedInUserData);
  const url = DOC_URL;
  const { id } = useParams();
  const { data: getDocument, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetDocumentById(id)
      : useGetDocumentById(loggedInUserData?.id);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const groupedDocuments = isLoading
    ? {}
    : groupBy(getDocument, "documentType");
    const [value, setValue] = React.useState(Object.keys(groupedDocuments)[0] || "1");

  

  useEffect(() => {
    if (!isLoading && Object.keys(groupedDocuments).length > 0) {
      setValue(Object.keys(groupedDocuments)[0]);
    }
  }, [isLoading, groupedDocuments]);

  return (
    // {data?():()}
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {isLoading ? (
              <p>Loding..</p>
            ) : (
              Object.keys(groupedDocuments).map((documentType, index) => (
                <Tab key={index} label={documentType} value={documentType} />
              ))
            )}
          </TabList>
        </Box>
        {isLoading ? (
          <TabPanel value="1">Loading...</TabPanel>
        ) : (
          Object.keys(groupedDocuments).map((documentType) => (
            <TabPanel
              key={documentType}
              value={documentType}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
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
