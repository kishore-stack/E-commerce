import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext); // ✅ logged-in user
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/user/profile-data").then(res => setData(res.data));
  }, []);

  if (!data) {
    return <p className="p-6 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* USER INFO */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Profile
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="bg-gray-50 border rounded px-3 py-2">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="bg-gray-50 border rounded px-3 py-2">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* CART */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">My Cart 🛒</h3>

          {data.cart?.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.cart?.map(c => (
                <div
                  key={c._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t">
                    <img
                      src={c.product.image}
                      alt={c.product.name}
                      className="h-full object-contain hover:scale-110 transition"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold truncate">
                      {c.product.name}
                    </p>
                    <p className="text-indigo-600 font-bold">
                      ₹{c.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WISHLIST */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">My Wishlist ❤️</h3>

          {data.wishlist?.length === 0 ? (
            <p className="text-gray-500">No items in wishlist</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.wishlist?.map(w => (
                <div
                  key={w._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t">
                    <img
                      src={w.image}
                      alt={w.name}
                      className="h-full object-contain hover:scale-110 transition"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold truncate">{w.name}</p>
                    <p className="text-indigo-600 font-bold">₹{w.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
