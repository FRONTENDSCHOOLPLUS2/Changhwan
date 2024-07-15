import { Link, useLocation } from "react-router-dom";

function Pagination({ currentPage, totalPages, onChange }) {
  const location = useLocation();
  const baseUrl = location.pathname;

  // 표시할 페이지 번호 범위 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    const showMax = 5; // 한 번에 표시할 최대 페이지 수
    let start = Math.max(1, currentPage - Math.floor(showMax / 2));
    let end = Math.min(totalPages, start + showMax - 1);

    if (end - start + 1 < showMax) {
      start = Math.max(1, end - showMax + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex gap-2">
        {currentPage > 1 && (
          <li>
            <Link
              to={`${baseUrl}?page=${currentPage - 1}`}
              onClick={() => onChange(currentPage - 1)}
              className="px-3 py-1 rounded border hover:bg-gray-100"
            >
              이전
            </Link>
          </li>
        )}

        {getPageNumbers().map((number) => (
          <li key={number}>
            <Link
              to={`${baseUrl}?page=${number}`}
              onClick={(e) => {
                e.preventDefault();
                console.log(`Clicked page number: ${number}`);
                onChange(number);
              }}
              className={`px-3 py-1 rounded border ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </Link>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link
              to={`${baseUrl}?page=${currentPage + 1}`}
              onClick={() => onChange(currentPage + 1)}
              className="px-3 py-1 rounded border hover:bg-gray-100"
            >
              다음
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
