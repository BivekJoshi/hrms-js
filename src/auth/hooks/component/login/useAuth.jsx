import { getUser } from "../../../../app/utils/cookieHelper";

import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = getUser();

  let isSuperAdmin = false;

  let isManager = false;

  let isAdmin = false;

  let isHrAdmin = false;

  let isHrClerk = false;

  let isEmployee = false;

  let status = "";

  if (token) {
    const decoded = jwtDecode(token);

    const { userRoles } = decoded;

    isSuperAdmin = userRoles.some((role) => role?.name === "ROLE_SUPER_ADMIN");

    isManager = userRoles.some((role) => role?.name === "ROLE_MANAGER");

    isAdmin = userRoles.some((role) => role?.name === "ROLE_ADMIN");

    isHrAdmin = userRoles.some((role) => role?.name === "ROLE_HR_ADMIN");

    isHrClerk = userRoles.some((role) => role?.name === "ROLE_HR_CLERK");

    isEmployee = userRoles.some((role) => role?.name === "ROLE_EMPLOYEE");

    if (isSuperAdmin) {
      status = "Super-Admin";
    } else if (isManager) {
      status = "Manager";
    } else if (isAdmin) {
      status = "Admin";
    } else if (isHrAdmin) {
      status = "HR-Admin";
    } else if (isHrClerk) {
      status = "HR-Clerk";
    } else if (isEmployee) {
      status = "Employee";
    }

    return {
      ...decoded,
      status,
      isSuperAdmin,
      isManager,
      isAdmin,
      isHrAdmin,
      isHrClerk,
      isEmployee,
    };
  }

  return {
    userName: "",
    userRoles: [],
    isSuperAdmin,
    isManager,
    isAdmin,
    isHrAdmin,
    isHrClerk,
    isEmployee,
    status,
  };
};

export default useAuth;