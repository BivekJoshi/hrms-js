import React from 'react';
import { useFormik } from 'formik';
import { FamilySchema } from './FamilySchema';
import { useAddFamily, useEditFamily } from '../useFamily';

const useFamilyForm = ({ data, isLoadingFamily: isLoading }) => {
  const { mutate: addMutate } = useAddFamily({});
  const { mutate: editMutate } = useEditFamily({});

  const familyDetails = 
  !isLoading &&
   data?.familyMembers.map((familyMember) => ({
    id:familyMember.id ||'',
    name: familyMember.name || '',
    relation: familyMember.relation || '',
    mobileNumber: familyMember.mobileNumber || '',
  }));

  const formik = useFormik({
    initialValues: {
      family: familyDetails && familyDetails.length > 0 
      ? familyDetails :
        [
          {
            name: '',
            relation: '',
            mobileNumber: ''
          }
        ],
    },
    enableReinitialize: true,
    validationSchema: FamilySchema,
    onSubmit: (values) => {
      if (!values?.id || values?.id === "") {
        handleRequest(values);        
      } else {
        handledEditRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addMutate(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };

  return { formik }
};

export default useFamilyForm;
