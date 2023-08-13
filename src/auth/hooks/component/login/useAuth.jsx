import { getUser } from "../../../../app/utils/cookieHelper";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token  = getUser();

  let isSuperAdmin = false;
  let isHr = false;
  let isAdmin = false;
  let isEmployee = false;
  let status = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { userRoles } = decoded;

    isSuperAdmin = userRoles.some(role => role?.name === "SUPER_ADMIN");
    isAdmin = userRoles.some(role => role?.name === "ADMIN");
    isHr = userRoles.some(role => role?.name === "HR_CLERK");
    isEmployee = userRoles.some(role => role?.name === "EMPLOYEE");

    if(isSuperAdmin){
      status = "Super-Admin";
    } else if (isAdmin) {
      status = "Admin";
    } else if (isHr) {
      status = "HR-Clerk";
    } else if (isEmployee) {
      status = "Employee";
    }

    return { ...decoded, status, isSuperAdmin, isHr, isAdmin, isEmployee };
  }
  return { userName: "", userRoles: [], isSuperAdmin, isHr, isAdmin, isEmployee, status };
};

export default useAuth;