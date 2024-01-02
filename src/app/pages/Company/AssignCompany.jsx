import React, { useState } from "react";
import { useGetCompany } from "../../hooks/company/useCompany";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Tooltip, Typography } from "@mui/material";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { EditAssignCompanyModal } from './CompanyModal/CompanyModal';
import { useGetEmployee, useGetEmployeeData } from '../../hooks/employee/useEmployee';

const AssignCompany = ({ permissions }) => {
  const { data: companyData, isLoading } = useGetCompany();
  const { data: employeeData, isLoading: empLoading } = useGetEmployee();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const getEmployeName = (rowData) => {

  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
        title: "Employee",
        field: "branchContact",
        render: (rowData) => {
            getEmployeName(rowData);
        },
        emptyValue: "-",
        width: "10vh",
        sorting: false,
      },
    {
      title: "Branch Name",
      field: "branchName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Branch Address",
      field: "branchAddress",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
    {
      title: "Contact",
      field: "branchContact",
      emptyValue: "-",
      width: "10vh",
      sorting: false,
    },
  
  ];

  const actions = [
    {
      icon: () => (
        // <ModeEditOutlineIcon />
        <HocButton
          permissions={permissions?.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: "Edit Branch",
      onClick: (event, rowData) => handleEditCompany(rowData),
    },
  ];

  const handleEditCompany = (rowData) => {
    setEditedCompany(rowData);
    setOpenEditModal(true);
  };

  return (
    <>
      <CustomTable
        title="Branch List"
        data={companyData}
        columns={columns}
        isLoading={isLoading}
        actions={actions}
      />

      {openEditModal && (
        <EditAssignCompanyModal
          title={"Edit Assigned Branch"}
          data={editedCompany}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default PermissionHoc(AssignCompany);
