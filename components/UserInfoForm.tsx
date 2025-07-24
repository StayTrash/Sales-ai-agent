// components/UserInfoForm.tsx
"use client";

import { useState } from "react";

export default function UserInfoForm({
  data
}: {
  data: { requirements: string[]; slot: { start:string; end:string } };
}) {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const submit = async () => {
    setStatus("Sending…");
    const res = await fetch("/api/create-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        requirements: data.requirements,
        slot: data.slot
      })
    });
    if (res.ok) {
      const { hangoutLink } = await res.json();
      setStatus(`✅ Scheduled! Meet link: ${hangoutLink}`);
    } else {
      setStatus("❌ Error sending invite");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">6. Your Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button
        disabled={!name || !email}
        onClick={submit}
        className="w-full px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Schedule & Finish
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
