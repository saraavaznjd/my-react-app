import { Routes, Route, Link, useParams, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Posts from "./pages/posts";
import PostDetail from "./pages/postDetail";
import About from "./pages/about";

/*function Posts() {
  return (
    <div>
      <ul>
        {postsArray.map(post => (
          <li key={post.id}>
            <Link to={String(post.id)}>{post.title}</Link>
          </li>

        ))}
      </ul>

      <Outlet />
    </div>
  )
}*/


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/posts" element={<Posts />}>
          <Route path=":id" element={<PostDetail />}></Route>
        </Route>
      </Routes>
      </main>
      <Footer />
    </div>
  )
}