import React from "react";

// import "../Style/tyle.css";
import "../Style/Style.css";
import { Box, Grid } from "@mui/material";
import ListUserDetails from "../../InfoTabs/BaiscInfoTab/Components/ListUserDetails";

const BasicInfo = ({ data }) => {
  const EMPLOYEE = {
    Gender: data?.gender || "",
    "Citizenship Number": data?.citizenshipNumber || "",
    "Date of Birth": data?.dateOfBirth || "",
    // "Mobile Number": data?.mobileNumber || "",
    // Email: data?.officeEmail || "",
    // Address: data?.addresses[0]?.city || "",
    "Marital Status": data?.maritalStatus || "",
    "Date of Join": data?.dateOfJoin || "",
    Position: data?.position?.positionName || "",
    // Department: data?.department.departmentName ||'',
  };

  const FAMILYMEMBERS = {
    Name: data?.familyMembers[0]?.name || "",
    Relation: data?.familyMembers[0]?.relation || "",
    "Contact Number": data?.familyMembers[0]?.mobileNumber || "",
  };

  const BANKDETAILS = {
    "Bank Name": data?.bankDetailSet[0]?.bankName || "",
    "Account Number": data?.bankDetailSet[0]?.bankAccountNumber || "",
    Location: data?.bankDetailSet[0]?.bankAddress || "",
    "PAN Number": data?.panNumber || "",
  };
  return (
    <>
      <Box container className="ProfileStyle">
        <Box>
          <ListUserDetails
            data={EMPLOYEE}
            cardTitle={"Basic Informations"}
            MarginBottom={"1rem"}
          />
        </Box>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
          className="FAM-BANK-DETAILS"
        >
          <Box>
            <ListUserDetails data={BANKDETAILS} cardTitle={"Bank Details"} />
          </Box>
          <Box>
            <ListUserDetails
              data={FAMILYMEMBERS}
              cardTitle={"Family Informations"}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BasicInfo;
