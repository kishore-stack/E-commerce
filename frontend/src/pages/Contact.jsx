import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Name is required";

    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }

    if (!form.phone) {
      errs.phone = "Phone number required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      errs.phone = "Invalid phone number";
    }

    if (!form.message || form.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const newMessage = {
    id: Date.now(),
    ...form,
    date: new Date().toLocaleString()
  };

  const existing =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

  existing.push(newMessage);

  localStorage.setItem("contactMessages", JSON.stringify(existing));

  setSuccess("Message saved successfully!");
  setForm({ name: "", email: "", phone: "", message: "" });
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="input w-full"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              className="input w-full"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              className="input w-full"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <textarea
              className="input w-full h-28 resize-none"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
