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
  getEmployeeName,
} from "../../api/employee/employee-api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const nameLabel = (emp) => {
  const position =
    emp?.positionName !== null && emp?.positionName !== undefined
      ? `(${emp.positionName})`
      : "";
  if (emp?.middleName === "") {
    return `${emp?.firstName} ${emp?.lastName} ${position}`;
  } else {
    return `${emp?.firstName} ${emp?.middleName} ${emp?.lastName} ${position}`;
  }
};

export const useGetEmployee = () => {
  const getQuery = useQuery(["getEmployee"], () => getEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  return {
    data:
      getQuery?.data?.map((d) => {
        return { employeeId: d.id, label: nameLabel(d) };
      }) || [],
  };
};

export const useGetEmployeeName = () => {
  const getQuery = useQuery(["getEmployeeName"], () => getEmployeeName(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  return {
    data:
      getQuery?.data?.map((d) => {
        return { employeeId: d.id, label: nameLabel(d) };
      }) || [],
  };
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

export const useGetEmployeeData = (pageNumber, pageSize, search) => {
  return useQuery(
    ["getEmployeeData", pageNumber, pageSize, search],
    () => getEmployeeData(pageNumber, pageSize, search),
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

export const useEditEmployee = (onSuccess) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(
    ["editEmployee"],
    async (formData) => await editEmployee(formData, id),
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
      queryClient.invalidateQueries("getEmployeeData");
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
