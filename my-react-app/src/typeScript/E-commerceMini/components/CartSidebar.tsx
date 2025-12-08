import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store.js";
import { removeFromCart } from "../features/cart/cartSlice.js";
import { Link } from "react-router-dom";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: Props) {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button className="text-gray-500 hover:text-black" onClick={onClose}>
                    ✕
                </button>
            </div>

            {/* Items */}
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-170px)]">
                {cart.items.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                )}

                {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} className="w-14 h-14 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.title}</h3>
                            <p className="text-gray-600 text-sm">${item.price}</p>
                        </div>
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            
            
            {/* Footer */}
            <div className="p-4 border-t flex justify-between font-semibold">
                <span>Total:</span>
                <span>${cart.totalPrice}</span>
            </div>
            {/*see Cart */}
            <Link to="/cart" className="relative cursor-pointer">
                <div onClick={onClose}
                    className="bg-black text-white mx-3 text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                    Go to Cart 🛒
                </div>
            </Link>
        </div>
    );
}
