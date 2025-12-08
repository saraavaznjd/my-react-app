import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/productsApi.js";
import ProductCard from "../components/ProductCard.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import womanImg from '../assets/hero/Women.jpg'
import manImg from '../assets/hero/man.jpg'
import accessoryImg from '../assets/hero/accessories.jpg'
import { useGetCategoriesQuery } from "../features/products/productsApi.js";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function Home() {
  const { data, isLoading, error } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>("none");

  //Matching a fake date for products to sorting
  const products = data?.map((p, i) => ({
    ...p,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(), // Each product one day older
  }));

  //Search & filter & price filter
  const filteredProducts = products?.filter((p) => {
    return (
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= minPrice &&
      p.price <= maxPrice
    );
  });

  //Sort filters
  let sortedProducts = [...(filteredProducts || [])];

  if (sortBy === "price-low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "price-high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  if (sortBy === "oldest") {
    sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }



  //slides of Hero slider
  const slides = [
    {
      title: "Women's Fashion",
      image: womanImg,
      subtitle: "Explore the latest styles and trends.",
      category: "women's clothing"
    },
    {
      title: "Men's Style",
      image: manImg,
      subtitle: "Upgrade your wardrobe today.",
      category: "men's clothing"
    },
    {
      title: "Accessories & Lifestyle",
      image: accessoryImg,
      subtitle: "Complete your look with unique pieces.",
      category: "jewelery"
    },
  ]

  return (
    <div>
      {/* Hero Slider */}
      <div className="w-full h-[90vh] overflow-hidden mb-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop
          pagination={{ clickable: true }}
          className="w-full h-full overflow-hidden mb-10"
        >
          {slides.map((src) => (
            <SwiperSlide key={src.image}>
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center text-white text-center relative"
                style={{ backgroundImage: `url(${src.image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-extrabold drop-shadow mb-3">{src.title}</h2>
                  <p className="text-lg opacity-90 max-w-lg mx-auto mb-5">{src.subtitle}</p>
                  <Link
                    to={`/products?category=${src.category}`}
                    className="mt-6 bg-white/90 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition shadow-lg"
                  >
                    Shop Now
                  </Link>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Products Section */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {isLoading && <p className="text-center mt-10 text-lg">Loading...</p>}
        {error && (
          <p className="text-center mt-10 text-lg text-red-500">
            Error loading products...
          </p>
        )}

        <div className="mb-8 border-b pb-4">

          <div className="flex sm:flex-row justify-between gap-40">

            {/* Left Side: Search + Category + Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">

              {/* Search */}
              <div className="relative w-full sm:w-52 shadow-xl">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-black/60 focus:outline-none"
                />
                <span className="absolute left-2 top-1.5 text-gray-500 text-sm">🔍</span>
              </div>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="shadow-xl text-sm border py-1.5 px-3 rounded-md focus:ring-1 focus:ring-black/60"
              >
                <option value="all">All Categories</option>
                {categories?.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shadow-xl text-sm border py-1.5 px-3 rounded-md focus:ring-1 focus:ring-black/60"
              >
                <option value="none">Sort</option>
                <option value="price-low-high">Price ↑</option>
                <option value="price-high-low">Price ↓</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {/* Right Side: Price Controls */}
            <div className="flex flex-col justify-center w-full sm:w-64 gap-3">
              {/* Min Price */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600">Min Price :</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="shadow-lg border p-2 rounded w-full sm:w-24" />
              </div>
              {/* Max Price */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600">Max Price :</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="shadow-lg border p-2 rounded w-full sm:w-24" />
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black"
              />
            </div>
          </div>
        </div>



        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {sortedProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}