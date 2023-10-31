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

const documentName = [
  {
    id: 1,
    label: "Profile",
    value: "EMPLOYEE_PHOTO",
  },
  {
    id: 2,
    label: "Citizenship",
    value: "CITIZENSHIP",
  },
  {
    id: 1,
    label: "Pan Card",
    value: "PAN_CARD",
  },
  {
    id: 1,
    label: "Academic Document",
    value: "ACADEMIC_DOCUMENT",
  },
  {
    id: 1,
    label: "Training Certificate",
    value: "TRAINING_CERTIFICATE",
  },
  {
    id: 1,
    label: "Certification",
    value: "CERTIFICATION",
  },
  {
    id: 1,
    label: "Experience Letter",
    value: "EXPERIENCE_LETTER",
  },
  {
    id: 1,
    label: "Awards and Acheivements",
    value: "AWARD_AND_ACHIEVEMENT",
  },
]
const DocumentInfo = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee, isHrAdmin, isManager } =
    useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  const url = DOC_URL;
  const { id } = useParams();
  const { data: getDocument, isLoading } =
    isSuperAdmin || isAdmin || isHr || isHrAdmin || isManager
      ? useGetDocumentById(id)
      : useGetDocumentById(loggedInUserData?.id);

  const groupedDocuments = isLoading
    ? {}
    : groupBy(getDocument, "documentType");

  const [value, setValue] = React.useState("EMPLOYEE_PHOTO");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {isLoading ? (
              <p>Loading..</p>
            ) : (
              Object.keys(groupedDocuments).map((documentType, index) => (
                <Tab 
                key={index} 
                label={documentName?.find((doc) => doc?.value === documentType)?.label}
                value={documentType} />
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
                padding:"0px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {groupedDocuments[documentType].map((document) => (
                <div key={document?.id}>
                  {document?.path.toLowerCase().endsWith(".pdf") ? (
                    <div key={document.id}>
                      <iframe
                        title="PDF Document"
                        src={`${url}${document?.path}`}
                        width="500px"
                        height="450px"
                      />
                    </div>
                  ) : (
                    <img
                      key={document.id}
                      src={`${url}${document?.path}`}
                      alt="Document"
                      width="100%"
                    />
                  )}
                </div>
              ))}
            </TabPanel>
          ))
        )}
      </TabContext>
    </Box>
  );
};

export default DocumentInfo;
