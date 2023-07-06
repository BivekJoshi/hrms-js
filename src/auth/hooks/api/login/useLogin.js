import { useMutation } from "react-query";
import { setUser } from "../../../../app/utils/cookieHelper";
import { login } from "../../../api/login/login-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
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
