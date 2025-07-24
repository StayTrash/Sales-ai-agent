// components/SlotPicker.tsx
"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SlotPicker({
  onNext
}: {
  onNext: (u: { slot: { start: string; end: string } }) => void;
}) {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [sel, setSel] = useState("");

  useEffect(() => {
    const dayStart = new Date(date);
    dayStart.setHours(9,0,0,0);
    const dayEnd = new Date(date);
    dayEnd.setHours(17,0,0,0);

    fetch("/api/freebusy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: dayStart.toISOString(),
        end:   dayEnd.toISOString()
      })
    })
    .then(r => r.json())
    .then(data => {
      const busy = data.calendars[process.env.CALENDAR_ID!]?.busy || [];
      const all: string[] = [];
      let cur = dayStart.getTime();
      while (cur < dayEnd.getTime()) {
        all.push(new Date(cur).toISOString());
        cur += 60*60*1000;
      }
      const free = all.filter(slot =>
        !busy.some((b: any) =>
          new Date(b.start).getTime() <= new Date(slot).getTime() &&
          new Date(b.end).getTime()   > new Date(slot).getTime()
        )
      );
      setSlots(free);
    });
  }, [date]);

  const confirm = () => {
    if (!sel) return;
    const start = sel;
    const end   = new Date(new Date(sel).getTime() + 60*60*1000).toISOString();
    onNext({ slot: { start, end } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">5. Pick a time slot</h2>
      <DatePicker
        selected={date}
        onChange={(d: Date) => setDate(d)}
        className="border rounded px-3 py-2"
      />
      <ul className="max-h-48 overflow-y-auto space-y-2">
        {slots.map(s => (
          <li key={s}>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="slot"
                value={s}
                checked={sel === s}
                onChange={() => setSel(s)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>
                {new Date(s).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        disabled={!sel}
        onClick={confirm}
        className="px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
