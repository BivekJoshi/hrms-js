import React from "react";
import useAuth from "../../auth/hooks/component/login/useAuth";

const PermissionHoc = (WrappedComponent) => {
    return (props) => {
        const { isSuperAdmin, isEmployee } = useAuth();

        const permissions = {
            canEdit: isSuperAdmin,
            canDelete: isSuperAdmin,
            canAdd: isSuperAdmin,
        };

        return (
            <WrappedComponent {...props} permissions={permissions} />
        )
    }
}

export default PermissionHoc;