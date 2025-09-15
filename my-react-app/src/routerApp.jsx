import { Routes, Route, Link, Outlet, useParams,BrowserRouter } from "react-router-dom";

function PostsLayout() {
  return (
    <div>
      <h2>Posts Section</h2>
      <nav>
        <Link to="1">Post 1</Link> |{" "}
        <Link to="2">Post 2</Link> |{" "}
        <Link to="3">Post 3</Link>
      </nav>

      <hr />
      {/* اینجا child routeها رندر میشن */}
      <Outlet />
    </div>
  );
}

function PostDetail() {
  const { id } = useParams(); // گرفتن id از URL
  return <p>Showing details for Post {id}</p>;
}

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/posts">Go to Posts</Link>
    </div>
  );
}

export default function App() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsLayout />}>
          <Route path=":id" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
