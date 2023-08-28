import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getUser, removeUser } from "../app/utils/cookieHelper";

import jwtDecode from "jwt-decode";

import Loader from "../app/components/Header/Loader/Loader";

export const AccessControl = ({ Component }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRoles?.[0]?.name;

  useEffect(() => {
    if (!userRole) {
      removeUser();
      navigate("/");
    } else if (userRole === "ROLE_SUPER_ADMIN" || userRole === "ROLE_MANAGER") {
      navigate("/admin/dashboard");
    } else if (userRole === "ROLE_EMPLOYEE") {
      navigate("/employee/dashboard");
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  return loading ? <Loader /> : Component;
};
