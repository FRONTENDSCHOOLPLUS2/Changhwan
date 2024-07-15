import Button from "@components/Button.jsx";
import Search from "@components/Search.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "@components/Pagination.jsx";
import ListItem from "@pages/community/ListItem.jsx";
import { useEffect, useState } from "react";
import useBoardApi from "@/Api/module/boardApi.js";

function List() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPage, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const boardApi = useBoardApi();

  const getBoardTitle = (type) => {
    switch (type) {
      case "free":
        return "자유 게시판";
      case "qna":
        return "질문 게시판";
      case "info":
      default:
        return "정보 공유";
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);

    const fetchBoards = async () => {
      setLoading(true);
      try {
        const data = await boardApi.getBoards(type, page, limit);
        // console.log(data);
        if (data.ok === 1) {
          console.log(data);
          setBoards(data.item);
          setTotalPages(data.pagination.totalPages);
        } else {
          setError("데이터를 불러오는데 실패했습니다.");
        }
      } catch (e) {
        setError("게시글을 불러오는데 실패했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, [type, searchParams, limit]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {getBoardTitle(type)}
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search />

        <Button
          type="button"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => navigate(`/${type}/new`)}
        >
          글작성
        </Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  로딩 중...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : boards.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boards.map((board) => (
                <ListItem key={board._id} board={board} type={type} />
              ))
            )}

            {/* 본문 출력 */}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onChange={handlePageChange}
        />
      </section>
    </main>
  );
}

export default List;
