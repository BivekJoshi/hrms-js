import React from "react";
import useAuth from "../../auth/hooks/component/login/useAuth";

const PermissionHoc = (WrappedComponent) => {
    return (props) => {
        const { isSuperAdmin, isEmployee } = useAuth();

        const permissions = {
            canView: isSuperAdmin,
            canEdit: isSuperAdmin,
            canDelete: isSuperAdmin,
            canAdd: isSuperAdmin,
            isEmployee: true,
        };

        return (
            <WrappedComponent {...props} permissions={permissions} />
        )
    }
}

export default PermissionHoc;