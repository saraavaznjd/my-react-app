import { useParams, Link } from "react-router-dom";

const posts = {
  1: { title: "Getting started with React", content: "This is the full content for post 1..." },
  2: { title: "Understanding useEffect", content: "This is the full content for post 2..." },
  3: { title: "React Router Guide", content: "This is the full content for post 3..." },
};

function PostDetail() {
  const { id } = useParams();
  const post = posts[id];

  if (!post) return <p>Post not found!</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <Link to="/posts" className="text-blue-500 hover:underline">← Back to Posts</Link>
    </div>
  );
}

export default PostDetail;
