import React from "react";
import type { Product } from "../types/types.js";
import { Link, useNavigate } from "react-router-dom";
import { toggleWishlist } from "../features/wishList/wishListSlice.js";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store.js";
import { addToCart } from "../features/cart/cartSlice.js";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishLists.items);
  const isLiked = wishlist.some((p) => p.id === product.id);
  const navigate = useNavigate()

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative border rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="w-full h-52 flex items-center justify-center overflow-hidden">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(
                toggleWishlist({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                })
              )
            }}
            className="absolute top-3 right-3 text-xl z-10"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-3">
          <h3 className="font-semibold text-base line-clamp-2 min-h-[48px]">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 capitalize">{product.category}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">${product.price}</p>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (user) {
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                )
              } else { navigate('/login') }
            }

            }
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 active:scale-95 transition">
            Add to Cart
          </button>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-100/40 group-hover:to-purple-100/40 transition opacity-0 group-hover:opacity-100 -z-10" />
      </div>
    </Link>

  );
};

export default ProductCard;
