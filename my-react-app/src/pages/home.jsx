import PostCard from "../components/PostCard";

const samplePosts = [
  { id: 1, title: "Getting started with React", summary: "Learn the basics of React and how to get started quickly." },
  { id: 2, title: "Understanding useEffect", summary: "A deep dive into useEffect and how to handle side effects." },
];

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to My Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {samplePosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
