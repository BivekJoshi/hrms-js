import {
  Button,
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteFamily,
  useGetFammilyById,
} from "../../../../hooks/employee/useFamily";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import FamilyAddFields from "./FamilyAddFields";
import useAddFamilyDetails from "./useAddFamilyDetails";
import CustomeEmployeeDetails from "../../../../utils/CustomeDetails/CustomeEmployeeDetails";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const NewEmployeeFamilyDetailForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFammilyById(id);

  const { formik, isFormSubmitSuccess, isEditSuccess } = useAddFamilyDetails();
  const deleteFamilyMutation = useDeleteFamily({});

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleDeleteFamily = (familyMember) => {
    if (familyMember?.id) {
      deleteFamilyMutation.mutate(familyMember.id);
    }
  };
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "relation", label: "Relation", minWidth: 150 },
    {
      id: "mobileNumber",
      label: "Mobile Number",
      minWidth: 150,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 50,
      align: "right",
      render: () => {
        return <div>TEst</div>;
      },
    },
  ];

  return (
    <div>
      <CustomeEmployeeDetails
        formik={formik}
        title={"Family Details"}
        columns={columns}
        data={data}
        renderFeilds={<FamilyAddFields formik={formik} />}
        isLoading={isLoading}
        handleFormSubmit={handleSubmit}
        isSubmitSuccess={isFormSubmitSuccess || isEditSuccess}
        deleteCallBack={handleDeleteFamily}
      />
    </div>
  );
};

export default NewEmployeeFamilyDetailForm;
