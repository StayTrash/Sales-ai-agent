// app/api/freebusy/route.ts
import { NextRequest, NextResponse } from "next/server";
import { calendar } from "../../../lib/google";

export async function POST(req: NextRequest) {
  const { start, end } = await req.json();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: start,
      timeMax: end,
      items: [{ id: process.env.CALENDAR_ID }]
    }
  });
  return NextResponse.json(res.data);
}
