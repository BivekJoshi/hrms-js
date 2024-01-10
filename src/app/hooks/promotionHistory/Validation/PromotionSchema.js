import * as Yup from 'yup';

const PositionSchema = Yup.object().shape({
  positionId: Yup.object().nullable().required('Position name is required.'),
  effectiveFromDate: Yup.string().required(' Effective Date is required.'),
  remarks: Yup.string().max(
    255,
    'Remarks cannot be greater than 255 characters'
  ),
});

export default PositionSchema;
