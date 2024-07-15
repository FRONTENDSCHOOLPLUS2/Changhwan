import useApi from "@/Api/index.js";

const useLogin = () => {
  const { customFetch } = useApi();

  const login = async (userData) => {
    try {
      const loginData = {
        email: userData.email,
        password: userData.password,
      };

      const data = await customFetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const token = data.item.token.accessToken; // 서버 응답에서 토큰 추출
      if (token) {
        sessionStorage.setItem("token", token); // 토큰을 sessionStorage에 저장
        console.log(token);
      }
      return data;
    } catch (e) {
      console.error("로그인 오류 : " + e);
      throw e;
    }
  };
  return { login };
};

export default useLogin;
