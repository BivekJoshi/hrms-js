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
    const { userRole } = decoded;

    isSuperAdmin = userRole.includes("ROLE_SUPER_ADMIN");

    isManager = userRole.includes("ROLE_MANAGER");

    isAdmin = userRole.includes("ROLE_ADMIN");

    isHrAdmin = userRole.includes("ROLE_HR_ADMIN");

    isHrClerk = userRole.includes("ROLE_HR_CLERK");

    isEmployee = userRole.includes("ROLE_EMPLOYEE");

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
    userRole: [],
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
