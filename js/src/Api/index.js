import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "@/Api/atoms.js";
import { getApiBaseUrl } from "@/utils/env.js";

const BASE_URL = getApiBaseUrl();

const useApi = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const customFetch = async (endPoint, options = {}) => {
    const url = `${BASE_URL}${endPoint}`;

    let headers = { ...options.headers };

    if (!options.body || !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        if (response.status === 401) {
          setIsLoggedIn(false);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
        }
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }
      return await response.json();
    } catch (e) {
      console.error("Fetch 통신 에러 : ", e);
      throw e;
    }
  };
  return { customFetch };
};

export default useApi;
