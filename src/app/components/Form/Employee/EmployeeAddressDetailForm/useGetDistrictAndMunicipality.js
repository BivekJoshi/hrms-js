import { useState } from "react";
import {
  useGetDistrictByProvience,
  useGetMunipalityByDistrict,
} from "../../../../hooks/employee/useAddress";
import { usePermanentAddressForm } from "../../../../hooks/employee/AddAddress/useAddressForm";

const province = [
  {
    value: "KOSHI",
    label: "Koshi Pradesh",
    id: 1,
  },
  {
    value: "MADHESH",
    label: "Madhesh Pradesh",
    id: 2,
  },
  {
    value: "BAGMATI",
    label: "Bagmati Pradesh",
    id: 3,
  },
  {
    value: "GANDAKI",
    label: "Gandaki Pradesh",
    id: 4,
  },
  {
    value: "LUMBINI",
    label: "Lumbini Pradesh",
    id: 5,
  },
  {
    value: "KARNALI",
    label: "Karnali Pradesh",
    id: 6,
  },
  {
    value: "SUDURPASHCHIM",
    label: "Sudurpashchim Pradesh",
    id: 7,
  },
];

const getProvanceId = (name) => province.find((d) => d.value === name)?.id;
const useGetDistrictAndMunicipality = (formValues) => {
  const { addresses } = formValues;
  const { province: permanentProvance, district: permanentDistrict } =
    addresses?.[0];
  const { province: temporaryProvance, district: temporaryDistrict } =
    addresses?.[1];

  const permanentProvanceId = getProvanceId(permanentProvance);
  const temporaryProvanceId = getProvanceId(temporaryProvance);

  const { data: tempDistrictOptions } =
    useGetDistrictByProvience(temporaryProvanceId);
  const { data: permanentDistrictsOptions } =
    useGetDistrictByProvience(permanentProvanceId);
  const { data: permanentMunicipalityOptions } =
    useGetMunipalityByDistrict(permanentDistrict);
  const { data: tempMunicipalityOptions } =
    useGetMunipalityByDistrict(temporaryDistrict);

  return {
    province,
    permanentDistrictsOptions,
    tempDistrictOptions,
    permanentMunicipalityOptions,
    tempMunicipalityOptions,
  };
};

export default useGetDistrictAndMunicipality;
