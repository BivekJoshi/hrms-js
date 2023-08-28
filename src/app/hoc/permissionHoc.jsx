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

    const permissions = {
      canView: isSuperAdmin || isManager || isAdmin || isHrAdmin || isHrClerk,

      canEdit: isSuperAdmin || isManager || isAdmin || isHrAdmin,

      canDelete: isSuperAdmin || isManager,

      canAdd: isSuperAdmin || isManager || isAdmin || isHrAdmin,

      isEmployee: true,
    };

    return <WrappedComponent {...props} permissions={permissions} />;
  };
};

export default PermissionHoc;
