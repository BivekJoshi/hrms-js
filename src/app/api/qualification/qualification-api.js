import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GETBYID_____________________________________*/
export const getQualificationById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/qualification/employee-id/${id}`);
    return data;
  }
};

/*________________________POST_____________________________________*/
export const addQualification = async (formData, id) => {
  const educationForm = new FormData();
  educationForm.append("board", formData?.board);
  educationForm.append("institute", formData?.institute);
  educationForm.append("passedLevel", formData?.passedLevel);
  educationForm.append("passedYear", formData?.passedYear);
  educationForm.append("grade", formData?.grade);
  educationForm.append("scoreType", formData?.scoreType);

  if (formData?.transcript) {
    educationForm.append("transcript  ", formData?.transcript || "");
  }
  if (formData?.characterCertificate) {
    educationForm.append(
      "characterCertificate ",
      formData?.characterCertificate || ""
    );
  }
  if (formData?.otherDocument) {
    educationForm.append("otherDocument  ", formData?.otherDocument || "");
  }

  const data = await axiosInstance.post(
    `/qualification/create/${id}`,
    educationForm
  );
  return data;
};

/*________________________EDIT_____________________________________*/
export const editQualification = async (formData, id) => {
  const data = await axiosInstance.put(
    `/qualification/update/${formData?.id}`,
    formData
  );
  return data;
};

export const editQualifiacationDocument = async (formData, id) => {
  await axiosInstance.put(`/qualification/update-file/${id}`, formData);
};

/*________________________DELETE_____________________________________*/
export const deleteQualifiaction = async (qualificationId) => {
  const data = await axiosInstance.delete(
    `/qualification/delete/${qualificationId}`
  );
  return data;
};
