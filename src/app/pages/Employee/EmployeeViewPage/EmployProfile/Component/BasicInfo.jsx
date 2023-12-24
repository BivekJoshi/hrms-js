import React from "react";
import "../Style/Style.css";
import { Box, Divider } from "@mui/material";

import ListUserDetails from "../../InfoTabs/BaiscInfoTab/Components/ListUserDetails";
import { useParams } from 'react-router-dom';
import { useGetBankByEmployeeId } from '../../../../../hooks/employee/useBank';
import { useGetFammilyById } from '../../../../../hooks/employee/useFamily';

const BasicInfo = ({ data, mode }) => {
  const { id } = useParams();
  const { data: bankData } = useGetBankByEmployeeId();
  const { data: familyData } = useGetFammilyById(id);
  const bData = bankData && bankData?.[0];
  const fData = familyData && familyData?.[0];
  
  const EMPLOYEE = {
    "Gender": data?.gender || "",
    "Citizenship Number": data?.citizenshipNumber || "",
    "Date of Birth": data?.dateOfBirth || "",
    "Marital Status": data?.maritalStatus || "",
    "Date of Join": data?.dateOfJoin || "",
    Position: data?.position?.positionName || "",
  };
  const FAMILYMEMBERS = {
    "Name": fData?.name || "",
    "Relation": fData?.relation || "",
    "Contact Number": fData?.mobileNumber || "",
  };

  const BANKDETAILS = {
    "Bank Name": bData?.bankName || "",
    "Account Number": bData?.bankAccountNumber || "",
    "Location": bData?.bankAddress || "",
    "PAN Number": data?.panNumber || "",
  };

  return (
    <>
      <Box
        container
        className="ProfileStyle"
        sx={{ backgroundColor: mode === "light" ? "#ededed" : "#292929" }}
      >
        <Box>
          <ListUserDetails
            data={EMPLOYEE}
            cardTitle={"Basic Informations"}
            MarginBottom={"1rem"}
            mode={mode}
          />
          <Divider />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "1rem",
            marginTop: { xs: "-3rem", sm: 0 },
          }}
          className="FAM-BANK-DETAILS"
        >
          <Box>
            <ListUserDetails
              data={BANKDETAILS}
              cardTitle={"Bank Details"}
              mode={mode}
            />
          </Box>
          <Box>
            <ListUserDetails
              data={FAMILYMEMBERS}
              cardTitle={"Family Informations"}
              mode={mode}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BasicInfo;
