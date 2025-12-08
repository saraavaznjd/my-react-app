import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

/*export default function AdminProducts() {
  // فعلا یک لیست فیک
  const products = [
    { id: 1, name: "Product A", price: 120000, category: "Shoes" },
    { id: 2, name: "Product B", price: 85000, category: "Clothes" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price.toLocaleString()} تومان</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button className="p-2 bg-red-500 text-white rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { deleteAdminProduct, getAdminProducts } from "./adminProductsCRUD.js";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const apiProducts = await fetch("https://fakestoreapi.com/products").then(r => r.json());
      const localProducts = getAdminProducts();

      //mix
      setProducts([...localProducts, ...apiProducts]);
    }
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="border p-3 rounded-lg">
            <img src={p.image} className="h-20 mx-auto" />
            <h3 className="font-semibold">{p.title}</h3>
            <p>${p.price}</p>
            <button
              onClick={() => navigate(`/admin/products/edit/${p.id}`)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => {
                if (confirm("Delete this product?")) {
                  deleteAdminProduct(p.id);
                  window.location.reload();
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
