import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productsApi.js";
import { addToCart } from "../features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store.js";

export default function ProductDetails() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetProductByIdQuery(Number(id));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.user)

    if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-lg text-red-500">Error loading product...</p>;

    return (
        <div className="px-6 py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center bg-gray-50 p-6 rounded-2xl">
                <img src={data?.image} className="max-h-[400px] object-contain" alt={data?.title} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-3">{data?.title}</h1>

                <p className="text-gray-500 text-lg mb-4 capitalize">{data?.category}</p>

                <p className="text-gray-700 leading-relaxed mb-6">{data?.description}</p>

                <p className="text-3xl font-semibold mb-6">${data?.price}</p>

                <button
                    onClick={() => {
                        if(user) {
                            dispatch(
                                addToCart({
                                    id: data!.id,
                                    title: data!.title,
                                    price: data!.price,
                                    image: data!.image,
                                    quantity: 1,
                                })
                            )} else {navigate('/login')}
                    }

                    }
                    className="bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    );
}
