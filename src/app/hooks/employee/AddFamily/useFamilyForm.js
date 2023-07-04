import { useFormik } from 'formik';
import { FamilySchema } from './FamilySchema';
import { useAddFamily, useEditFamily } from '../useFamily';

const useFamilyForm = ({ data, isLoadingFamily: isLoading }) => {
  const { mutate } = useAddFamily({});
  const { mutate: editMutate } = useEditFamily({});

  const familyDetails = 
  !isLoading &&
   data?.familyMembers.map((familyMember) => ({
    id:familyMember?.id ||'',
    name: familyMember.name || '',
    relation: familyMember.relation || '',
    mobileNumber: familyMember.mobileNumber || '',
  }));

  const formik = useFormik({
    initialValues: {
      family: familyDetails &&
        familyDetails.length > 0 ?
        familyDetails :
        [
          {
            name: '',
            relation: '',
            mobileNumber: ''
          }
        ],
    },
    enableReinitialize: "true",
    validationSchema: FamilySchema,
    onSubmit: (values) => {
      if (familyDetails.length>0) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values, };
    mutate(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };

  return { formik }
};

export default useFamilyForm;
