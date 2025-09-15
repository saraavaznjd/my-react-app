import PostCard from "../components/PostCard";
import { Outlet } from "react-router-dom";

const allPosts = [
  { id: 1, title: "Getting started with React", summary: "Learn the basics of React and how to get started quickly." },
  { id: 2, title: "Understanding useEffect", summary: "A deep dive into useEffect and how to handle side effects." },
  { id: 3, title: "React Router Guide", summary: "Learn how to navigate between pages using React Router." },
];

function Posts() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <Outlet />
    </div>
  );
}

export default Posts;
