import Header from "@components/layout/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "@components/layout/Footer.jsx";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

// Outlet을 사용함으로써 코드의 재사용성이 높아지고, 일관된 레이아웃을 쉽게 유지할 수 있으며, 라우트 구조를 더 명확하게 표현할 수 있습니다.
