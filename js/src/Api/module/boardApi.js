// src/api/boardApi.js

import useApi from "@/Api/index.js";

const useBoardApi = () => {
  const { customFetch } = useApi();

  // 게시글 목록 조회 (카테고리별)
  const getBoards = async (category, page, limit) => {
    try {
      return await customFetch(
        `/posts?type=${category}&page=${page}&limit=${limit}`,
      );
    } catch (error) {
      console.error(`${category} 게시글 목록 조회 실패:`, error);
      throw error;
    }
  };

  // 게시글 상세 조회
  const getBoardById = async (id) => {
    try {
      return await customFetch(`/posts/${id}`);
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);
      throw error;
    }
  };

  // 게시글 작성
  const createBoard = async (category, boardData) => {
    try {
      return await customFetch("/boards", {
        method: "POST",
        body: JSON.stringify({ ...boardData, category }),
      });
    } catch (error) {
      console.error(`${category} 게시글 작성 실패:`, error);
      throw error;
    }
  };

  // 게시글 수정
  const updateBoard = async (id, boardData) => {
    try {
      return await customFetch(`/boards/${id}`, {
        method: "PUT",
        body: JSON.stringify(boardData),
      });
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      throw error;
    }
  };

  // 게시글 삭제
  const deleteBoard = async (id) => {
    try {
      return await customFetch(`/boards/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      throw error;
    }
  };

  // 게시글 검색 (카테고리별)
  const searchBoards = async (category, keyword, page = 1, limit = 10) => {
    try {
      return await customFetch(
        `/boards/search?category=${category}&keyword=${keyword}&page=${page}&limit=${limit}`,
      );
    } catch (error) {
      console.error(`${category} 게시글 검색 실패:`, error);
      throw error;
    }
  };

  // 게시글 좋아요 토글
  const toggleLike = async (id) => {
    try {
      return await customFetch(`/boards/${id}/like`, {
        method: "POST",
      });
    } catch (error) {
      console.error("게시글 좋아요 토글 실패:", error);
      throw error;
    }
  };

  // 게시글 댓글 목록 조회
  const getComments = async (boardId, page = 1, limit = 10) => {
    try {
      return await customFetch(
        `/boards/${boardId}/comments?page=${page}&limit=${limit}`,
      );
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
      throw error;
    }
  };

  // 게시글 댓글 작성
  const createComment = async (boardId, commentData) => {
    try {
      return await customFetch(`/boards/${boardId}/comments`, {
        method: "POST",
        body: JSON.stringify(commentData),
      });
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      throw error;
    }
  };

  return {
    getBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
    searchBoards,
    toggleLike,
    getComments,
    createComment,
  };
};

export default useBoardApi;
