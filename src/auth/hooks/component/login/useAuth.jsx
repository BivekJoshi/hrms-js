import { getUser } from "../../../../app/utils/cookieHelper";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const { data } = getUser();
  const token = data;
  let isManager = false;
  let isAdmin = false;
  let isEmployee = false;
  let status = "";

  if (token) {
    const decoded = jwtDecode(token);
    // const { userName, userRoles } = decoded;

    
    // isAdmin = userRoles.includes("admin");
    // isManager = userRoles.includes("manager");
    // isEmployee = userRoles.includes("employee");

    // if (isAdmin) {
    //   status = "Admin";
    // } else if (isManager) {
    //   status = "Manager";
    // } else if (isEmployee) {
    //   status = "Employee";
    // }

    // return { userName, userRoles, status, isManager, isAdmin, isEmployee };
    return decoded;
  }
  return { userName: "", userRoles: [], isManager, isAdmin, isEmployee, status };
};

export default useAuth;