import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="font-bold text-xl">
        E-Shop
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        {user.role === "admin" && (
          <Link
            to="/admin/products"
            className="bg-indigo-600 px-3 py-1 rounded text-sm hover:bg-indigo-700"
          >
            Admin
          </Link>
        )}

        {/* PROFILE ICON */}
        <Link to="/profile" title="Profile">
          <svg
            className="w-6 h-6 hover:text-indigo-400 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
