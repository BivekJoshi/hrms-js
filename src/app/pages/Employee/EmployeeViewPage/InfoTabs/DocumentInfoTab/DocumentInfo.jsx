import React, { useContext, useEffect, useRef, useState } from "react";
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
import { Button, Fade, Modal } from "@mui/material";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import ReactToPrint from "react-to-print";
import "./printDocs.css";
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
    id: 3,
    label: "Pan Card",
    value: "PAN_CARD",
  },
  {
    id: 4,
    label: "Academic Document",
    value: "ACADEMIC_DOCUMENT",
  },
  {
    id: 5,
    label: "Training Certificate",
    value: "TRAINING_CERTIFICATE",
  },
  {
    id: 6,
    label: "Certification",
    value: "CERTIFICATION",
  },
  {
    id: 7,
    label: "Experience Letter",
    value: "EXPERIENCE_LETTER",
  },
  {
    id: 8,
    label: "Curriculum Vitae",
    value: "CURRICULUM_VITAE",
  },
  {
    id: 9,
    label: "Awards and Acheivements",
    value: "AWARD_AND_ACHIEVEMENT",
  },
  {
    id: 10,
    label: "Signed Contract",
    value: "SIGNED_CONTRACT",
  },
  {
    id: 11,
    label: "Health Insurance",
    value: "HEALTH_INSURANCE",
  },
  {
    id: 12,
    label: 'Other Document',
    value: 'OTHER_DOCUMENT',
  },
];
const DocumentInfo = ({ data, role }) => {
  // const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmp ? useGetLoggedInUserInfo() : {};

  const { mode } = useContext(ThemeModeContext);

  const url = DOC_URL;
  const { data: getDocument, isLoading } = role ? useGetDocumentById(data?.id)  : useGetDocumentById(data?.id);
  const groupedDocuments = isLoading ? {} : groupBy(getDocument, "documentType");

  const [value, setValue] = React.useState("EMPLOYEE_PHOTO");
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const componentRef = useRef();
  const openPreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "12px 24px",
    background: mode === "light" ? "" : "#413e3e",
    color: mode === "light" ? "" : "white",
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
                  label={
                    documentName?.find((doc) => doc?.value === documentType)
                      ?.label
                  }
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
            <TabPanel
              key={documentType}
              value={documentType}
              sx={{
                padding: "0px",
                display: "flex",
                alignItems: "center", // Center content vertically
                justifyContent: "center", // Center content horizontally
                height: "100%",
              }}
            >
              {groupedDocuments[documentType].map((document) => (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: " 16px",
                  }}
                  key={document?.id}
                >
                  {document?.path.toLowerCase().endsWith(".pdf") ? (
                    <div key={document.id}>
                      <iframe
                        title="PDF Document"
                        src={`${url}${document?.path}`}
                        width="400px"
                        height="100%"
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        ref={componentRef}
                        key={document.id}
                        src={`${url}${document?.path}`}
                        alt="Document"
                        width="400px"
                        height="350px"
                        className="to-print"
                        onClick={() => openPreview(`${url}${document?.path}`)}
                      />
                      <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                          variant="contained"
                          onClick={() => openPreview(`${url}${document?.path}`)}
                        >
                          Preview
                        </Button>
                        <ReactToPrint
                          trigger={() => (
                            <Button variant="contained">Print Document</Button>
                          )}
                          content={() => componentRef.current}
                          documentTitle="hrms-docuemt.pdf"
                        />
                      </div>
                      <Modal
                        open={isPreviewOpen}
                        onClose={closePreview}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        closeAfterTransition
                      >
                        <Fade in={isPreviewOpen}>
                          <Box sx={style}>
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ width: "100%" }}
                            />
                          </Box>
                        </Fade>
                      </Modal>
                    </>
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
