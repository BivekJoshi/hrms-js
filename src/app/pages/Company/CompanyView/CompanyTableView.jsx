import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PermissionHoc from "../../../hoc/permissionHoc";
import useAuth from "../../../../auth/hooks/component/login/useAuth";
import CustomTable from "../../../components/CustomTable/CustomTable";
import HocButton from "../../../hoc/hocButton";

const CompanyTableView = ({
  permissions,
  companyData,
  isLoading,
  handleEditCompany,
  handleDeleteCompany,
}) => {
  const { isEmployee } = useAuth();
  console.log({"permissions": permissions})


  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      width: "3%",
      sortable: false,
      sorting: false,
    },
    {
      title: "Company Name",
      field: "companyName",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Company Type",
      field: "companyType",
      emptyValue: "-",
      width: "20vh",
      sorting: false,
    },
    {
      title: "Description",
      field: "companyDescription",
      emptyValue: "-",
      width: 400,
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
      tooltip: "Edit Company",
      onClick: (event, rowData) => handleEditCompany(rowData),
    },
    {
      icon: () => (
        // <DeleteIcon />
        <HocButton permissions={permissions?.canDelete} icon={<DeleteIcon />} />
      ),
      tooltip: "Delete Company",
      onClick: (event, rowData) => handleDeleteCompany(rowData),
    },
  ];

  if (isEmployee) {
    actions.length = 0;
  }

  if (isLoading) return <>Loading</>;

  return (
    <>
      <CustomTable
        columns={columns}
        data={companyData}
        title="Company List"
        isLoading={isLoading}
        exportButton={true}
        actions={actions}
      />
    </>
  );
};

export default CompanyTableView;
