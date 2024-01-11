import * as Yup from 'yup';

const EmployeeResourceSchema = Yup.object().shape({
  officeResourceId: Yup.string().required('Please select office logistics'),
  employeeId: Yup.string().required('Please select employee name'),
  remarks: Yup.string().max(
    255,
    'Remarks cannot be greater than 255 characters'
  ),
  receiveDate: Yup.string().required('Please select the received date'),
  returnDate: Yup.string()
    .nullable()
    .notRequired()
    .when('receiveDate', (receiveDate, schema) => {
      return schema.test({
        test: (returnDate) => {
          if (!receiveDate || !returnDate) {
            return true;
          }
          const receivedDateObject = new Date(receiveDate);
          const returnDateObject = new Date(returnDate);
          return returnDateObject >= receivedDateObject;
        },
        message: 'Returned date must be greater than or equal to received date',
      });
    }),
});

const EmployeeResourceEditSchema = Yup.object().shape({
  conditionWhileReturned: Yup.string().required('Required'),
  receiveDate: Yup.string().required('Please select the received date'),
  returnDate: Yup.string()
    .required('Required')
    .when('receiveDate', (receiveDate, schema) => {
      return schema.test({
        test: (returnDate) => {
          if (!receiveDate || !returnDate) {
            return true;
          }
          const receivedDateObject = new Date(receiveDate);
          const returnDateObject = new Date(returnDate);
          return (
            returnDateObject >= receivedDateObject &&
            returnDateObject <= new Date()
          );
        },
        message: 'Returned date must be greater than or equal to received date',
      });
    }),
});

export { EmployeeResourceSchema, EmployeeResourceEditSchema };
