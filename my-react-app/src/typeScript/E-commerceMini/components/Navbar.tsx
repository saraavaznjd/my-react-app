import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store.js";
import CartSidebar from "./CartSidebar.js";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { toast } from 'react-hot-toast'
import { emptyCart } from "../features/cart/cartSlice.js";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false)
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            SaraShop<span className="text-pink-600">.</span>
          </Link>

          {/* Nav Links */}
          <div className="md:flex items-center gap-8 text-gray-700">
            <Link to="/" className="hover:text-pink-600 transition">Home</Link>
            <Link to="/products" className="hover:text-pink-600 transition">Products</Link>
            <Link to="/about" className="hover:text-pink-600 transition">About</Link>
          </div>

          {/*Authorization */}
          <div className="flex items-center gap-4">
            <button onClick={() => user ? setOpen(true) : toast.error("Please login first!")}
              className="relative">
              🛒
              {totalQuantity > 0 && user && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button onClick={() => user ? navigate('/account/orders') : toast.error("Please login first!")}
              className="relative">
              👤
            </button>
            <button onClick={() => user ? navigate('/account/wishlist') : toast.error("Please login first!")}
              className="relative text-xl hover:text-pink-600">
              ❤️
            </button>
            {user ? (
              <>
                <span className="text-sm">Hi, <span className="text-lg font-bold">{user.username}</span></span>
                <button
                  onClick={() => {
                    dispatch(emptyCart())
                    dispatch(logout())

                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login" className="text-sm hover:underline">Login</a>
            )}
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
