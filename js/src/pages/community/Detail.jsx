import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@components/Button.jsx";
import CommentList from "@pages/community/CommentList.jsx";
import useBoardApi from "@/Api/module/boardApi.js";

function Detail() {
  const navigate = useNavigate();
  const { _id } = useParams(); // type 제거
  const boardApi = useBoardApi();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoardDetail = useCallback(async () => {
    if (!_id || _id === "undefined") {
      setError("유효하지 않은 게시글 ID입니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await boardApi.getBoardById(_id); // type 제거
      setBoard(data.item);
    } catch (err) {
      console.error("Error fetching board details:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [_id]);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchBoardDetail();
    }
  }, [fetchBoardDetail]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!board) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {board.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {board.user?.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {board.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(-1)}>목록</Button>
          <Button bgColor="gray" onClick={() => navigate(`/${_id}/edit`)}>
            수정
          </Button>
          <Button bgColor="red" onClick={() => navigate(`/posts`)}>
            삭제
          </Button>
        </div>
      </section>

      {/*<CommentList boardId={_id} />*/}
    </main>
  );
}

export default Detail;
