import React from "react";
import "../Style/Style.css";
import { Box, Divider, Grid, Stack } from "@mui/material";
import ListUserDetails from "../../InfoTabs/BaiscInfoTab/Components/ListUserDetails";
import { useGetBankByEmployeeId } from "../../../../../hooks/employee/useBank";
import { useGetFammilyById } from "../../../../../hooks/employee/useFamily";

const BasicInfo = ({ data, mode, positionName, empId }) => {
  const { data: bankData } = useGetBankByEmployeeId();
  const { data: familyData } = useGetFammilyById(data?.id);

  const bData = bankData && bankData?.[0];
  const fData = familyData && familyData?.[0];
const position = positionName && positionName.length > 0 ? positionName.join(', ') : ''
  const EMPLOYEE = {
    Gender: data?.gender || "",
    "Citizenship Number": data?.citizenshipNumber || "",
    "Date of Birth": data?.dateOfBirth || "",
    "Marital Status": data?.maritalStatus || "",
    "Position": position || "",
    "PAN Number": data?.panNumber || "",
  };
  const FAMILYMEMBERS = {
    Name: fData?.name || "",
    Relation: fData?.relation || "",
    "Contact Number": fData?.mobileNumber || "",
  };

  const BANKDETAILS = {
    "Bank Name": bData?.bankName || "",
    "Account Number": bData?.bankAccountNumber || "",
    Location: bData?.bankAddress || "",
  };

  return (
    <Box
      container="true"
      sx={{
        display: "flex",
        flexDirection: "column", // or 'row' based on your layout preference
        gap: "2rem",
        borderRadius: "1rem",
        padding: "1rem",
        backgroundColor: mode === "light" ? "#ededed" : "#292929",
      }}
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
         {bankData && bankData.length > 0 && (
          <Grid>
            <ListUserDetails
              data={BANKDETAILS}
              cardTitle={"Bank Details"}
              mode={mode}
            />
          </Grid>
        )}
        {familyData && familyData.length > 0 && (
          <Grid>
            <ListUserDetails
              data={FAMILYMEMBERS}
              cardTitle={"Family Informations"}
              mode={mode}
            />
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default BasicInfo;
