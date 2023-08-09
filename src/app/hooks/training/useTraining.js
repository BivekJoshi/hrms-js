import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addTrainingDetail,
  deleteTraining,
  editTraining,
  getTrainingById,
  getTrainingDetail,
} from "../../api/training/training-api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetTraining = () => {
  return useQuery(["getTrainingDetail"], () => getTrainingDetail(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET BY TRAINING ID_____________________________________*/
export const useGetTrainingById = (id) => {
  return useQuery(["getTrainingById", id], () => getTrainingById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddTrainingDetail = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ["addTrainingDetail"],
    (formData) => addTrainingDetail(formData,id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added Employee Training");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getTrainingDetail");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteTraining = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteTraining"],
    (companyId) => deleteTraining(companyId),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Employee Training");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getTrainingDetail");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

/*________________________EDIT_____________________________________*/
export const useEditTraining = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editTraining"], (formData) => editTraining(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully edited Employee Training");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getTrainingDetail");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};
