import { getUser } from "../../../../app/utils/cookieHelper";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token  = getUser();

  let isSuperAdmin = false;
  // let isHr = false;
  let isAdmin = false;
  let isEmployee = false;
  let status = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { userRoles } = decoded;

    isSuperAdmin = userRoles.some(role => role?.name === "ROLE_SUPER_ADMIN");
    isAdmin = userRoles.some(role => role?.name === "ROLE_ADMIN");
    // isHr = userRoles.some(role => role?.name === "ROLE_HR_CLERK");
    isEmployee = userRoles.some(role => role?.name === "ROLE_EMPLOYEE");

    if(isSuperAdmin){
      status = "Super-Admin";
    } else if (isAdmin) {
      status = "Admin";
    } 
    // else if (isHr) {
    //   status = "HR-Clerk";
    // } 
    else if (isEmployee) {
      status = "Employee";
    }

    return { ...decoded, status, isSuperAdmin, isAdmin, isEmployee };
  }
  return { userName: "", userRoles: [], isSuperAdmin, isAdmin, isEmployee, status };
};

export default useAuth;