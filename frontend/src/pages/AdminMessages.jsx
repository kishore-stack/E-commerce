import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("contactMessages")) || [];
    setMessages(stored);
  }, []);

  if (!messages.length)
    return <p className="text-center mt-10">No messages</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      <div className="space-y-4">
        {messages.map(m => (
          <div
            key={m.id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <p><b>Name:</b> {m.name}</p>
            <p><b>Email:</b> {m.email}</p>
            <p><b>Phone:</b> {m.phone}</p>
            <p><b>Message:</b> {m.message}</p>
            <p className="text-sm text-gray-500">{m.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
