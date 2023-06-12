import React from 'react';
import { useEditEmployee, useGetEmployeeById } from '../useEmployee';
import { EditEmployeeSchema } from './EditEmployeeSchema';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

const useEditEmployeeForm = () => {
  const { id } = useParams();
  const { mutate } = useEditEmployee({});
  const { data, isLoading } = useGetEmployeeById(id);

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      gender: data?.gender,
      dateOfBirth: data?.dateOfBirth,
      dateOfJoin: data?.dateOfJoin,
      mobileNumber: data?.mobileNumber,
      citizenshipNumber: data?.citizenshipNumber,
      panNumber: data?.panNumber,
      officeEmail: data?.officeEmail,
      maritalStatus: data?.maritalStatus,
      companyId: data?.company?.id,
      positionId: data?.position?.id,
      departmentId: data?.department?.id,
    },
    validationSchema: EditEmployeeSchema,
    enableReinitialize: 'true',
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    console.log(values);
    values = {
      ...values,
    };
    mutate(values);
  };

  return { formik, isLoading };
};

export default useEditEmployeeForm;
