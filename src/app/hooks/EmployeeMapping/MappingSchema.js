import * as Yup from 'yup';

const AddMapSchema = Yup.object().shape({
  deviceEmpId: Yup.string().required('Device Employee Id  is required'),
  deviceBranchId: Yup.string().required('Device Branch Id is required'),
});

export default AddMapSchema;
