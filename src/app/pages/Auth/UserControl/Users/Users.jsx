import { Stack, Button } from "@mui/material";
import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import UserControlAction from "../../../../pages/Auth/UserControl/UserControlAction";
import { AddUserControlModal } from "./AddUserControlModal";
import { useGetUserControl } from "../../../../hooks/auth/userControl/useUserControl";
import PermissionHoc from "../../../../hoc/permissionHoc";

const roleType = [
  {
    name: "ROLE_SUPER_ADMIN",
    label: "Super Admin",
    id: 1,
  },
  {
    name: "ROLE_ADMIN",
    label: "Admin",
    id: 2,
  },
  {
    name: "ROLE_MANAGER",
    label: "Manager",
    id: 3,
  },
  {
    name: "ROLE_HR_ADMIN",
    label: "HR Admin",
    id: 1,
  },
  {
    name: "ROLE_HR_CLERK",
    label: "HR Clerk",
    id: 1,
  },
  {
    name: "ROLE_EMPLOYEE",
    label: "Employee",
    id: 1,
  },
];

const columns = [
  { title: "SN", field: "id", emptyValue: "-", width: "80" },
  { title: "Name", field: "name", emptyValue: "-", width: "80" },
  { title: "Mobile Number", field: "mobileNo", emptyValue: "-", width: "80" },
  { title: "Email", field: "email", emptyValue: "-", width: "120" },
  {
    title: "Role",
    render: (rowData) => getRoleLabel(rowData?.roles?.[0]?.name),
    width: "80",
  },
  {
    title: "Action",
    render: (rowData) => <UserControlAction rowData={rowData} />,
    width: "80",
  },
];

const getRoleLabel = (roleName) => {
  const role = roleType?.find((role) => role?.name === roleName);
  return role ? role?.label : "-";
};

const Users = ({ permissions }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const { data: userControlData, isLoading } = useGetUserControl();
  if (permissions?.canView) {
    return (
      <>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ maxWidth: "fit-content" }}
              onClick={handleAddOpenModal}
            >
              + Add User
            </Button>
          </Stack>
          <Stack>
            <MaterialTable
              columns={columns}
              data={userControlData}
              title="User List"
              isLoading={isLoading}
              options={{
                padding: "dense",
                margin: 50,
                pageSize: 10,
                emptyRowsWhenPaging: false,
                headerStyle: {
                  backgroundColor: "#01579b",
                  color: "#FFF",
                  fontSize: "1rem",
                  padding: "dense",
                  height: 50,
                  textAlign: "center",
                  border: "2px solid #fff",
                  minHeight: "10px",
                  textTransform: "capitilize",
                },
                rowStyle: {
                  fontSize: ".8rem",
                },
              }}
            />
          </Stack>
        </Stack>

        {openAddModal && (
          <AddUserControlModal
            open={openAddModal}
            handleCloseModal={handleCloseAddModal}
          />
        )}
      </>
    );
  } else {
    return <>You Donot have permissions to view this page</>;
  }
};

export default Users;
