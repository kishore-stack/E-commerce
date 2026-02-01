import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    if (!user) return alert("Please login first");
    try {
      await api.post("/user/cart", { productId: id, quantity: 1 });
      alert("Added to cart");
    } catch {
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    if (!user) return alert("Please login first");
    try {
      await api.post("/user/wishlist", { productId: id });
      alert("Added to wishlist");
    } catch {
      alert("Failed to add to wishlist");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      {product.image && (
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-64 object-cover rounded-lg my-4"
  />
)}

      <p className="text-gray-600 my-2">₹{product.price}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={addToCart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>

        <button
          onClick={addToWishlist}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}
