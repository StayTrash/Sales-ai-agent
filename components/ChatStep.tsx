// components/ChatStep.tsx
"use client";

import { useState } from "react";

type Msg = { role: string; content: string };

export default function ChatStep({
  data,
  onNext
}: {
  data: { requirements: string[] };
  onNext: (u: { chatLog: Msg[] }) => void;
}) {
  const [log, setLog] = useState<Msg[]>([
    { role: "system", content:
      `You are a sales assistant. The user wants: ${data.requirements.join(", ")}.`
    }
  ]);
  const [text, setText] = useState("");

  const send = async () => {
    const newLog = [...log, { role: "user", content: text }];
    setLog(newLog);
    setText("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newLog })
    });
    const { message } = await res.json();
    setLog(l => [...l, message]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">4. Live Chat</h2>
      <div className="border rounded p-3 h-48 overflow-y-auto space-y-2">
        {log.map((m,i) => (
          <div key={i}>
            <span className="font-semibold">{m.role}:</span>{" "}
            <span>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask a question…"
        />
        <button
          disabled={!text}
          onClick={send}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
      <button
        onClick={() => onNext({ chatLog: log })}
        className="mt-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Done Chatting
      </button>
    </div>
  );
}
