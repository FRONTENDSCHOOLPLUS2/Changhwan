import { useNavigate } from "react-router-dom";

function ListItem({ board }) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{board._id}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/posts/${board._id}`)}
      >
        {board?.title || "제목 없음"}
      </td>
      <td className="p-2 text-center truncate">
        {board?.user?.name || "알 수 없음"}
      </td>
      <td className="p-2 text-center hidden sm:table-cell">{board?.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {board?.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {board?.createdAt}
      </td>
    </tr>
  );
}

export default ListItem;
