// App.jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Day 10 - Routing in React</h1>
      <h2>🏠 Home</h2>
    </>

  )

}

function ProductList() {
  const products = [
    { id: 1, name: "Phone" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Tablet" }
  ];

  return (
    <div>
      <h2>📦 Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams(); // getting address from id
  return <h2>📄 Details of product {id}</h2>;
}

function NotFound() {
  return <h2>🚫 Page note founde!</h2>;
}

export default App;
