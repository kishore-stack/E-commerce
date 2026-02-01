import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data);       // save user + token
      navigate("/");         // redirect
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       <button
  type="submit"
  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
>
  Login
</button>

<p className="text-center mt-4 text-sm">
  Not registered?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-blue-600 cursor-pointer font-medium"
  >
    Please register
  </span>
</p>
      </form>
    </div>
  );
};

export default Login;
