import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.message.trim()) e.message = "Message required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString()
    };

    const existing =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    localStorage.setItem(
      "contactMessages",
      JSON.stringify([...existing, msg])
    );

    setSuccess("Message sent successfully");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-14 mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto space-y-4"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border p-3 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <textarea
            placeholder="Message"
            rows="4"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full border p-3 rounded"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}

          <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">
            Send Message
          </button>

          {success && (
            <p className="text-green-600 text-center mt-2">{success}</p>
          )}
        </form>
      </div>
    </section>
  );
}
