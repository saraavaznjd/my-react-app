import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.js";

export default function Wishlist() {
  const wishlist = useSelector((state: RootState) => state.wishLists.items);

  if (wishlist.length === 0)
    return <p className="text-center text-gray-500 mt-10">No items yet ❤️‍🩹</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-lg transition"
        >
          <img
            src={item.image}
            className="w-full h-40 object-contain mb-3"
          />
          <h3 className="font-semibold">{item.title}</h3>
          <p className="font-bold">${item.price}</p>
        </div>
      ))}
    </div>
  );
}
