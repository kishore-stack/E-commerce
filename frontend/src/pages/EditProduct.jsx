import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    discount: "",
    image: ""
  });

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Product not found");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, form);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      alert("Update failed (admin only)");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        <input
          className="input"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          className="input"
          name="subCategory"
          placeholder="Sub Category"
          value={form.subCategory}
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="number"
          name="discount"
          placeholder="Discount %"
          value={form.discount}
          onChange={handleChange}
        />

        <input
          className="input md:col-span-2"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="md:col-span-2 w-40 h-40 object-cover rounded"
          />
        )}

        <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Update Product
        </button>
      </form>
    </div>
  );
}
