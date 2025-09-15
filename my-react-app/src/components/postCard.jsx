import { Link } from "react-router-dom";

function PostCard({ id, title, summary }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{summary}</p>
      <Link
        to={`${id}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;
