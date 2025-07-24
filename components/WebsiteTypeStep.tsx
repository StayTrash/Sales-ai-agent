// components/WebsiteTypeStep.tsx
"use client";

import { useState } from "react";

export default function WebsiteTypeStep({
  onNext
}: {
  onNext: (u: { type: string }) => void;
}) {
  const [type, setType] = useState("");
  const options = ["E-commerce","Blog","Portfolio","Corporate","Other"];

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">1. Choose website type</h2>
      <div className="flex flex-wrap gap-4">
        {options.map(o => (
          <label key={o} className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value={o}
              checked={type === o}
              onChange={() => setType(o)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-lg">{o}</span>
          </label>
        ))}
      </div>
      <button
        disabled={!type}
        onClick={() => onNext({ type })}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
