import React from "react";
import { useParams } from "react-router-dom";

import QualificationAddField from "./QualificationAddField";
import useAddQualificationDetails from "./useAddQualificationDetail";
import CustomeEmployeeDetails from "../../../../utils/CustomeDetails/CustomeEmployeeDetails";
import {
  useDeleteQualification,
  useGetQualificationById,
} from "../../../../hooks/employee/useQualification";
import { TableCell } from "@material-ui/core";
import { Preview } from "@mui/icons-material";
import { TableRow } from "@mui/material";
import { DOC_URL } from "../../../../../auth/axiosInterceptor";

const NewEmployeeQualificationDetailForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetQualificationById(id);
  const { formik, isFormSubmitSuccess, isEditSuccess } =
    useAddQualificationDetails();
  const deleteHistoryMutation = useDeleteQualification({});

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleDeleteHistory = (history) => {
    if (history?.id) {
      deleteHistoryMutation.mutate(history.id);
    }
  };

  const columns = [
    { id: "board", label: "Board", minWidth: 170 },
    { id: "institute", label: "Institude", minWidth: 150 },
    {
      id: "passedLevel",
      label: "Passed Level",
      minWidth: 150,
    },
    { id: "passedYear", label: "Passed Year", minWidth: 150 },
    { id: "scoreType", label: "Score Type", minWidth: 150 },
    { id: "grade", label: "Score", minWidth: 150 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 50,
      align: "right",
    },
  ];

  return (
    <div>
      <CustomeEmployeeDetails
        formik={formik}
        title={"Education Detail"}
        columns={columns}
        data={data}
        renderFeilds={<QualificationAddField formik={formik} />}
        isLoading={isLoading}
        handleFormSubmit={handleSubmit}
        isSubmitSuccess={isFormSubmitSuccess || isEditSuccess}
        deleteCallBack={handleDeleteHistory}
        showDocumentImg
        modalWidth={480}
        renderShowDocumentCell={
          <TableRow>
            {data?.map((d) => {
              const {
                transcriptPath,
                otherDocumentPath,
                characterCertificatePath,
              } = d;
              const documentName = transcriptPath
                ? "Transcript"
                : otherDocumentPath
                ? "Other Document"
                : characterCertificatePath
                ? "Character Certificate"
                : "";
              if (
                !transcriptPath &&
                !otherDocumentPath &&
                !characterCertificatePath
              )
                return <TableCell></TableCell>;
              else {
                return (
                  <TableCell>
                    {transcriptPath && (
                      <ShowImage name={documentName} path={transcriptPath} />
                    )}
                    {characterCertificatePath && (
                      <ShowImage
                        name={documentName}
                        path={characterCertificatePath}
                      />
                    )}
                    {otherDocumentPath && (
                      <ShowImage name={documentName} path={otherDocumentPath} />
                    )}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        }
      />
    </div>
  );
};

const ShowImage = ({ name, path }) => {
  return (
    <div style={{margin:"0px 5px"}}>
      {name} <img height={100} width={100} src={DOC_URL + path} alt={name} />
    </div>
  );
};

export default NewEmployeeQualificationDetailForm;
