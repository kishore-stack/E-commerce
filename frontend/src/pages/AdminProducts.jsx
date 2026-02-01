import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    discount: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", form);
      fetchProducts();
      setForm({
        name: "",
        category: "",
        subCategory: "",
        price: "",
        discount: "",
        image: "",
      });
      alert("Product added");
    } catch (err) {
      alert("Admin only");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin • Products</h1>

      {/* ADD PRODUCT */}
      <form
        onSubmit={handleAddProduct}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow mb-10"
      >
        <input className="input" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input className="input" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input className="input" name="subCategory" placeholder="Sub Category" value={form.subCategory} onChange={handleChange} />
        <input className="input" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input className="input" name="discount" type="number" placeholder="Discount %" value={form.discount} onChange={handleChange} />
        <input className="input" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        <button className="md:col-span-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
          Add Product
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {products.map(p => (
          <div
            key={p._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image || "https://via.placeholder.com/80"}
                className="w-20 h-20 object-cover rounded"
                alt={p.name}
              />
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">₹{p.price}</p>
              </div>
            </div>

            <div className="flex gap-3">
          <Link
  to={`/admin/products/edit/${p._id}`}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Edit
</Link>



              <button
                onClick={() => handleDelete(p._id)}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
