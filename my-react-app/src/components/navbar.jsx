import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">My Blog</h1>
        <ul className="flex gap-4">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/posts" className="hover:text-gray-300">Posts</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
