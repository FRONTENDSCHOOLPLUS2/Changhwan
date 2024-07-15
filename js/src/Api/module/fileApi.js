import useApi from "@/Api/index.js";

const useFileUpload = () => {
  const { customFetch } = useApi();

  const uploadFiles = async (files) => {
    const formData = new FormData();

    for (const file of files) {
      formData.append("attach", file);
    }

    try {
      const response = await customFetch("/files", {
        method: "POST",
        body: formData,
      });
      return response;
    } catch (e) {
      console.error("파일 업로드 에러 : ", e);
      throw e;
    }
  };

  return { uploadFiles };
};

export default useFileUpload;
