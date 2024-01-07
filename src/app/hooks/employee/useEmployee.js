import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addEmployee,
  editEmployee,
  getEmployee,
  getEmployeeData,
  getEmployeeByCompany,
  getEmployeeByDesignation,
  getEmployeeById,
  getEmployeeBydepartment,
  getEmployeeProgress,
  getLoggedInUserInfo,
  getNoneUser,
} from "../../api/employee/employee-api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const nameLabel = (emp) => {
  if (emp?.middleName === "") {
    return `${emp?.firstName} ${emp?.lastName} (${emp?.positionName})`;
  } else {
    return `${emp?.firstName} ${emp?.middleName} ${emp?.lastName} (${emp?.positionName})`;
  }
};

export const useGetEmployee = () => {
  return useQuery(["getEmployee"], () => getEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
export const useGetNoneUser = () => {
  const getQuery = useQuery(["getNoneUser"], () => getNoneUser(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  return {
    data:
      getQuery.data?.map((d) => ({
        id: d?.id,
        label: nameLabel(d),
        email: d?.officeEmail,
      })) || [],
  };
};

export const useGetLoggedInUserInfo = () => {
  return useQuery(["getLoggedInUserInfo"], () => getLoggedInUserInfo(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEmployeeData = (pageNumber, pageSize) => {
  return useQuery(
    ["getEmployeeData", pageNumber, pageSize],
    () => getEmployeeData(pageNumber, pageSize),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetEmployeeById = (id) => {
  return useQuery(["getEmployeeById", id], () => getEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useEditEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(
    ["editEmployee"],
    async (formData) => {
      try {
        const data = await editEmployee(formData, id);
        return data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (data) {
          toast.success("Employee edited successfully");
        }

        onSuccess && onSuccess(data);
        queryClient.invalidateQueries("getEmployeeById");
      },
    }
  );
};

export const useAddEmployee = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation(["addEmployees"], (formData) => addEmployee(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Employee added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getEmployee");
    },
    onError: (err, _variables, _context) => {
      // toast.error(`error: ${err.message}`);
    },
  });
};

export const useGetEmployeeByDepartment = (searchQuery) => {
  return useQuery(
    ["getEmployeeBydepartment", searchQuery],
    () => getEmployeeBydepartment(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetEmployeeByCompany = (searchQuery) => {
  return useQuery(
    ["getEmployeeByCompany", searchQuery],
    () => getEmployeeByCompany(searchQuery),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetEmployeeByDesignation = (searchQuery) => {
  return useQuery(
    ["getEmployeeByDesignation", searchQuery],
    () => getEmployeeByDesignation(searchQuery),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetEmployeeProgress = (id) => {
  return useQuery(["getEmployeeProgress", id], () => getEmployeeProgress(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
