import React from "react";
import { useFormik } from "formik";
import FamilySchema from "./FamilySchema";
import { useAddFamily, useEditFamily, useGetFammilyById } from "../useFamily";
import { useParams } from "react-router-dom";

const useFamilyForm = () => {
  const { id } = useParams();
  const { mutate: addMutate } = useAddFamily({});
  const { mutate: editMutate } = useEditFamily({});
  const { data, isLoading } = useGetFammilyById(id);

  const familyDetails =
    !isLoading &&
    data?.map((familyMember) => ({
      id: familyMember.id || "",
      name: familyMember.name || "",
      relation: familyMember.relation || "",
      mobileNumber: familyMember.mobileNumber || "",
    }));

  const formik = useFormik({
    initialValues: {
      family:
        familyDetails && familyDetails.length > 0
          ? familyDetails
          : [
              {
                name: "",
                relation: "",
                mobileNumber: "",
              },
            ],
    },
    enableReinitialize: true,
    validationSchema: FamilySchema,
    onSubmit: (values) => {
      if (values.family.some((member) => !member.id)) {
        handleAddRequest(values);
      } else {
        handledEditRequest(values);
      }
    },
  });

  const handleAddRequest = (values) => {
    values = { ...values };
    addMutate(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };

  return { formik };
};

export default useFamilyForm;
