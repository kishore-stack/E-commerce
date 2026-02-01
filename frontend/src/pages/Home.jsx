import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <>
      {/* PRODUCTS SECTION */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => {
            const finalPrice =
              p.discount > 0
                ? p.price - (p.price * p.discount) / 100
                : p.price;

            return (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border"
              >
                {/* IMAGE */}
                <div className="relative bg-gray-100 h-40 flex items-center justify-center rounded-t-xl overflow-hidden">
                  <img
                    src={p.image || "https://via.placeholder.com/300"}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                  />

                  {p.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {p.discount}% OFF
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {p.category || "General"}
                  </p>

                  <div className="mb-3">
                    {p.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through mr-2">
                        ₹{p.price}
                      </span>
                    )}
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{finalPrice}
                    </span>
                  </div>

                  <Link
                    to={`/product/${p._id}`}
                    className="block text-center bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
