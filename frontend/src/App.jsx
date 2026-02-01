import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Contact from "./pages/Contact";
import AdminMessages from "./pages/AdminMessages";


function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <PrivateRoute adminOnly>
            <AdminProducts />
          </PrivateRoute>
        }
      />

      {/* ✅ EDIT ROUTE FIXED */}
      <Route
        path="/admin/products/edit/:id"
        element={
          <PrivateRoute adminOnly>
            <EditProduct />
          </PrivateRoute>
        }
      />
      
<Route path="/contact" element={<Contact />} />
<Route path="/admin/messages" element={<AdminMessages />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
