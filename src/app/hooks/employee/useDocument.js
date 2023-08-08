import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteDocumentByFileId,
  getDocumentByDocumentType,
  getDocumentByFileId,
  getDocumentById,
} from "../../api/document/document-api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../auth/axiosInterceptor";

export const useAddDocument = ({ onSuccess }) => {
  const { id } = useParams();

  const addDocument = async (image, id) => {
    
    const { documentType, document } = image;
    const imgData = new FormData();
    imgData.append("file", document);
    imgData.append("documentType", documentType);
    const { data } = await axiosInstance.post(
      `/employee/document/upload-multipart-file/${id}`,
      imgData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  };

  const queryClient = useQueryClient();
  return useMutation(
    ["addDocument"],
    (formData) => {
      addDocument(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Document added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocumentType");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useAddProfile = ({ onSuccess }) => {
  const { id } = useParams();

  const addDocument = async (image, id) => {
    const { documentType, document } = image;
    const imgData = new FormData();
    imgData.append("file", document);
    imgData.append("documentType", documentType);
    const { data } = await axiosInstance.post(
      `/employee/document/upload-employee-photo/${id}`,
      imgData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  };

  const queryClient = useQueryClient();
  return useMutation(
    ["addProfile"],
    (formData) => {
      addDocument(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("Document added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProfile");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetDocumentById = (id) => {
  return useQuery(["getDocumentById", id], () => getDocumentById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetDocumentByFileId = (id) => {
  return useQuery(["getDocumentById", id], () => getDocumentByFileId(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET-DOCUMENT BY DOUCUMENT-TYPE_____________________________________*/
}
export const useGetDocumentByDocumentType = (id, documentType) => {
  return useQuery(
    ["getDocumentType", id, documentType],
    () => getDocumentByDocumentType(id, documentType),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________DELETE-BY-FILE-ID_____________________________________*/
}
export const useDeleteDocument = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteDocument"], (id) => deleteDocumentByFileId(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Successfully deleted file");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getDocumentType");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditDocument = ({ onSuccess }) => {

  const editDocument = async (image) => {
  
    const { id, data } = image;
    const imgData = new FormData();
    imgData.append("file", data);

    const { newData } = await axiosInstance.put(
      `employee/document/change-multipart-file/${id}`,
      imgData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return newData;
  };

  const queryClient = useQueryClient();
  return useMutation(
    ["editDocument"],
    (formData) => editDocument(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully edited Document");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocumentById");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
