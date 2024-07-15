import Submit from "@components/Submit.jsx";
import Button from "@components/Button.jsx";
import useRegistration from "@/Api/module/userApi.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("user");
  const [profileImage, setProfileImage] = useState(null);
  const { registration: register } = useRegistration();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await register({
        email,
        password,
        name,
        phone,
        address,
        type,
        profileImage,
      });
      console.log("회원 가입 성공 : ", result);
      alert("회원 가입에 성공 하였습니다.");
      navigate("/");
    } catch (e) {
      console.error("등록 실패 : ", e);
      alert("회원 가입에 실패 하였습니다.");
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="phone"
            >
              휴대전화
            </label>
            <input
              type="text"
              id="phone"
              placeholder="- 없이 번호만 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="address"
            >
              주소
            </label>
            <input
              type="text"
              id="address"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="type"
            >
              유저 구분
            </label>
            <div className="inline-block mr-4">
              <input
                id="user"
                type="radio"
                name="type"
                value="user"
                checked={type === "user"}
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="user">구매자</label>
            </div>
            <div className="inline-block">
              <input
                id="seller"
                type="radio"
                name="type"
                value="seller"
                checked={type === "seller"}
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="seller">판매자</label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button onClick={() => history.back()}>취소</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
