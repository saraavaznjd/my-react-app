import { useGetProductsQuery } from "../features/products/productsApi.js";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function Products() {
    const { data, isLoading, error } = useGetProductsQuery();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    
    const categories = [
        { label: "All", value: "" },
        { label: "Women", value: "women's clothing" },
        { label: "Men", value: "men's clothing" },
        { label: "Accessories", value: "jewelery" },
    ];

    const filtered = category
        ? data?.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
        : data;

    if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-lg text-red-500">Error loading products...</p>;

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
                {category ? category.toUpperCase() : "All Products"}
            </h2>

            <div className="flex gap-3 mb-6 flex-wrap">
                {categories.map((c) => (
                    <Link
                        key={c.value}
                        to={`/products${c.value ? `?category=${c.value}` : ""}`}
                        className={`px-4 py-2 rounded-full border text-sm hover:bg-gray-100 transition ${c.value === category ? "bg-black text-white border-black" : "border-gray-300"
                            }`}
                    >
                        {c.label}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filtered?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
