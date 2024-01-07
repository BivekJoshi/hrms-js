import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPathConfigure, getPathConfig } from "../../../api/email/email-api";
import { toast } from "react-toastify";

export const usePathAddConfig = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addPathConfig"],
    (formData) => addPathConfigure(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully added path configuration");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("addPathConfig");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.error}`);
      },
    }
  );
};

export const useGetPathConfig = () => {
  return useQuery(["getPathConfig"], () => getPathConfig(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.error}`);
    },
  });
};
