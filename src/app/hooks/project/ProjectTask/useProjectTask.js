import { useQuery } from "react-query";
import { getProjectTask } from "../../../api/project/projectTask-api";
import { useParams } from "react-router-dom";

/*________________________GETBYID_____________________________________*/
  export const useGetProjectTaskByProjectId = () => {
    const { id } = useParams();
    return useQuery(["getProjectTask", id], () => getProjectTask(id), {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };