import React from "react";
import useAuth from "../../auth/hooks/component/login/useAuth";
import PermissionHierarchy from "./PermissionHierarchy";

const PermissionHoc = (WrappedComponent) => {
  return (props) => {
    const {
      isSuperAdmin,
      isAdmin,
      isManager,
      isHrAdmin,
      isHrClerk,
      isEmployee,
    } = useAuth();
    const component = props.component;
    const permissions = PermissionHierarchy?.[component];

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
      : isEmployee
      ? "employee"
      : "";

    const componentPermissions = permissions?.[userRole];

    return <WrappedComponent {...props} permissions={componentPermissions} />;
  };
};

export default PermissionHoc;
