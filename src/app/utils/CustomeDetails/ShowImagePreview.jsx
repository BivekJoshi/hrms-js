import React, { useEffect, useRef, useState } from "react";
import { DOC_URL } from "../../../auth/axiosInterceptor";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TableCell,
  Typography,
} from "@mui/material";
import { BsEye } from "react-icons/bs";
import "./ShowImagePreview.css";
import CloseIcon from "@mui/icons-material/Close";
import ReactToPrint from "react-to-print";
import './ShowImagePreview.css';

const ImagePrintConponent = ({ path, name }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const isItemHovered = hoveredItem === name;
  const ref = useRef();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "80%",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "12px 24px",
  };

  const openPreview = (name) => {
    setSelectedItem(name);
  };

  const closePreview = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="p">
          {name !== "Experience Letter" ? name : ""}
        </Typography>
        <ReactToPrint
          trigger={() => <Button variant="contained">Print</Button>}
          content={() => ref.current}
          documentTitle="academics-docuemt.pdf"
        />
      </div>
      <div
        className="image-preview-container"
        onMouseEnter={() => setHoveredItem(name)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <img
          ref={ref}
          src={DOC_URL + path}
          alt={name}
          className='to-print'
          // style={{ width: "160px", height: "100px" }}
        />
        <div
          className={`overlay-container ${isItemHovered ? "visible" : ""}`}
          onClick={() => openPreview(name)}
        >
          <BsEye color="white" size={30} />
        </div>
      </div>

      {selectedItem && (
        <Modal
          open={true}
          onClose={closePreview}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
        >
          <Fade in={true}>
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  height: "2rem",
                  bottom: "0",
                }}
              >
                <IconButton onClick={closePreview}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "-webkit-fill-available",
                    paddingBottom: "5%",
                  }}
                  src={DOC_URL + path}
                  alt={selectedItem}
                />
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

const ShowImagePreview = ({ row }) => {
  const [documentData, setDocumentData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [hoveredItem, setHoveredItem] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const accumulateDocumentData = () => {
      const newDocumentData = [];

      const {
        transcriptPath,
        otherDocumentPath,
        characterCertificatePath,
        experiencePath,
      } = row;

      if (transcriptPath) {
        newDocumentData.push({
          name: "Transcript",
          path: transcriptPath,
        });
      }
      if (characterCertificatePath) {
        newDocumentData.push({
          name: "Character Certificate",
          path: characterCertificatePath,
        });
      }
      if (experiencePath) {
        newDocumentData.push({
          name: "Experience Letter",
          path: experiencePath,
        });
      }
      if (otherDocumentPath) {
        newDocumentData.push({
          name: "Other Document",
          path: otherDocumentPath,
        });
      }
      setDocumentData(newDocumentData);
    };

    accumulateDocumentData();
  }, [row]);

  const openPreview = (name) => {
    setSelectedItem(name);
  };

  const closePreview = () => {
    setSelectedItem(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "80%",
    bgcolor: "background.paper",
    border: "1px solid #808080",
    borderRadius: 2,
    boxShadow: 24,
    p: "12px 24px",
  };

  console.log(documentData);

  const singleDoc = documentData?.map((document) => {
    const isItemHovered = hoveredItem === document.name;

    return (
      <TableCell key={row.id + document.name}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            Test Div
            <ImagePrintConponent path={document?.path} name={document?.name} />
          </div>
          {/* <div sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p">
              {document?.name !== "Experience Letter" ? document?.name : ""}
            </Typography>
            <ReactToPrint
              trigger={() => <Button variant="contained">Print</Button>}
              content={() => componentRef.current}
              documentTitle="hrms-docuemt.pdf"
            />
          </div>
          <div
            className="image-preview-container"
            onMouseEnter={() => setHoveredItem(document.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              ref={componentRef}
              src={DOC_URL + document?.path}
              alt={document?.name}
            />
            <div
              className={`overlay-container ${isItemHovered ? "visible" : ""}`}
              onClick={() => openPreview(document?.name)}
            >
              <BsEye color="white" size={30} />
            </div>
          </div> */}
        </Box>
      </TableCell>
    );
  });
  console.log(singleDoc);
  return (
    <>
      {singleDoc}

      {/* {selectedItem && (
        <Modal
          open={true}
          onClose={closePreview}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
        >
          <Fade in={true}>
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  height: "2rem",
                  bottom: "0",
                }}
              >
                <IconButton onClick={closePreview}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "-webkit-fill-available",
                    paddingBottom: "5%",
                  }}
                  src={
                    DOC_URL +
                    documentData?.find((item) => item?.name === selectedItem)
                      ?.path
                  }
                  alt={selectedItem}
                />
              </div>
            </Box>
          </Fade>
        </Modal>
      )} */}
    </>
  );
};

export default ShowImagePreview;
