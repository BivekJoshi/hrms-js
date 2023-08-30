import React from "react";

import useAuth from "../../auth/hooks/component/login/useAuth";

const PermissionHoc = (WrappedComponent) => {
  return (props) => {
    const {
      isSuperAdmin,
      isManager,
      isAdmin,
      isHrAdmin,
      isHrClerk,
      isEmployee,
    } = useAuth();

    const roleHierarchy = {
      superAdmin: ["admin", "manager", "hrAdmin", "hrClerk", "employee"],
      admin: ["manager", "hrAdmin", "hrClerk", "employee"],
      manager: ["hrAdmin", "hrClerk", "employee"],
      hrAdmin: ["hrClerk", "employee"],
      hrClerk: ["employee"],
      employee: [],
    };

    const userRole = isSuperAdmin
      ? "superAdmin"
      : isAdmin
      ? "admin"
      : isManager
      ? "manager"
      : isHrAdmin
      ? "hrAdmin"
      : isHrClerk
      ? "hrClerk"
      : "employee";

      const permissions = {
        canView: true,
        canEdit: false,
        canDelete: false,
        canAdd: false,
      };
      
    const addComponent = ["designation", "department", "leave"];
    const deleteComponent = ["designation", "department", "leave"];
    const editComponent = ["designation", "department", "leave"];

    return <WrappedComponent {...props} permissions={permissions} />;
  };
};

export default PermissionHoc;