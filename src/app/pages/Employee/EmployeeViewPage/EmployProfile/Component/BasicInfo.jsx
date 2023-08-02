import React from "react";
import "../Style/Style.css";
import { Box, Divider } from "@mui/material";

import ListUserDetails from "../../InfoTabs/BaiscInfoTab/Components/ListUserDetails";

const BasicInfo = ({ data, mode }) => {
  const EMPLOYEE = {
    Gender: data?.gender || "",
    "Citizenship Number": data?.citizenshipNumber || "",
    "Date of Birth": data?.dateOfBirth || "",
    "Marital Status": data?.maritalStatus || "",
    "Date of Join": data?.dateOfJoin || "",
    Position: data?.position?.positionName || "",
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
