import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store.js";
import { removeFromCart, decreaseQuantity, addToCart, emptyCart } from "../features/cart/cartSlice.js";
import { addOrder } from "../features/orders/ordersSlice.js";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state:RootState) => state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} className="h-20" />

              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(addToCart(item))
                  }
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <p className="text-2xl font-semibold text-right">Total: ${total.toFixed(2)}</p>
        </div>
      )}
      {(items.length > 0) && <button
        onClick={() => {
          dispatch(addOrder({
            orderId: crypto.randomUUID(),
            userId: user?.username || "guest",
            createdAt: Date.now(),
            total,
            items: items,
            status: "pending",
          }));
          dispatch(emptyCart())
          toast.success("Order placed!")
          navigate('/account/orders')
        }}
        className="block w-full mt-16 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
        Pay 🛒
      </button>}
    </div>
  );
}
