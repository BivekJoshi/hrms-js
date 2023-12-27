import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addLeaveByAdmin,
  addleave,
  deleteLeave,
  editLeave,
  editLeaveByAdmin,
  editLeaveStatusByAdmin,
  getEmployeeLeaveById,
  getLeaveById,
  getLoggedInUserLeave,
  getLoggedInUserLeaveBalance,
  getleave,
  getleaveOfUser,
  getpendingleave,
} from "../../api/leave/leave-api";

/*________________________GET ALL_____________________________________*/
export const useGetleaveOfUser = () => {
  return useQuery(["getLeave"], () => getleaveOfUser(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET ALL_____________________________________*/
export const useGetLeave = () => {
  return useQuery(["getleaveOfUser"], () => getleave(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET PENDING LEAVE_____________________________________*/
export const useGetPendingLeave = () => {
  return useQuery(["getpendingleave"], () => getpendingleave(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET LOGGED IN USER LEAVE_____________________________________*/
export const useGetLoggedInUserLeave = () => {
  return useQuery(["getLoggedInUserLeave"], () => getLoggedInUserLeave(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET LEAVE OF LOGGED IN USER LEAVE BALANCE_____________________________________*/
export const useGetLoggedInUserLeaveBalance = () => {
  return useQuery(
    ["getLoggedInUserLeaveBalance"],
    () => getLoggedInUserLeaveBalance(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET BY LEAVE ID_____________________________________*/
export const useGetLeaveById = (id) => {
  return useQuery(["getLeaveById", id], () => getLeaveById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET EMPLOYEE LEAVE BY ID_____________________________________*/
export const useGetEmployeeLeaveById = (id) => {
  return useQuery(
    ["getEmployeeLeaveById", id],
    () => getEmployeeLeaveById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST BY ADMIN_____________________________________*/
export const useAddLeaveByAdmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["addLeaveByAdmin"],
    (formData) => addLeaveByAdmin(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added Leave");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getLeave");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
  return {
    mutate: mutation.mutate,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/*________________________POST BY USER_____________________________________*/
export const useAddLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addLeave"], (formData) => addleave(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Succesfully added Leave");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("useGetLoggedInUserLeave");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteLeave"], (leaveId) => deleteLeave(leaveId), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully deleted Leave");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getLeave");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

/*________________________EDIT_____________________________________*/
export const useEditLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editLeave"], (formData) => editLeave(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully edited Leave");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("useGetLoggedInUserLeave");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

/*________________________EDIT BY ADMIN_____________________________________*/
export const useEditLeaveByAdmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editLeaveByAdmin"],
    (formData) => editLeaveByAdmin(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Leave");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getLeave");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

/*________________________EDIT BY ADMIN_____________________________________*/
export const useEditLeaveStatusByAdmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["editLeaveByAdmin"],
    (formData) => editLeaveStatusByAdmin(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Leave");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getLeave");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
  return {
    mutate: mutation.mutate,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
