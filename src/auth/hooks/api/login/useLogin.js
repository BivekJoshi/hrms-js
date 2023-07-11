import { useMutation } from "react-query";
import { getUser, setUser } from "../../../../app/utils/cookieHelper";
import { login } from "../../../api/login/login-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useLogin = (data) => {
  const navigate = useNavigate();
  const token = getUser();
  useEffect(()=> {
    if(token){
      navigate("/admin/dashboard");
    }
  }, [token]);

  return useMutation(
    ["login"],
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data) => {
        setUser(data);
        toast.success("Login Successful");
        navigate("/admin/dashboard");
      },
    }
  );
};
