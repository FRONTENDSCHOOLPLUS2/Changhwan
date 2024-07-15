import useApi from "@/Api/index.js";
import useFileUpload from "@/Api/module/fileApi.js";

const useRegistration = () => {
  const { customFetch } = useApi();
  const { uploadFiles } = useFileUpload();

  const registration = async (userData) => {
    try {
      let profileImageInfo = null;
      if (userData.profileImage) {
        const uploadedFiles = await uploadFiles([userData.profileImage]);
        profileImageInfo = uploadedFiles.item[0];
      }
      const registrationData = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        type: userData.type,
        profileImage: profileImageInfo,
      };

      const data = await customFetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      return data;
    } catch (e) {
      console.error("등록 오류 : ", e);
      throw e;
    }
  };
  return { registration };
};
export default useRegistration;
