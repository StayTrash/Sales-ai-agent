// app/api/create-event/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createMeetEvent } from "../../../lib/google";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: +process.env.EMAIL_SMTP_PORT!,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS
  }
});

export async function POST(req: NextRequest) {
  const { name, email, requirements, slot } = await req.json();

  const start = slot.start;
  const end   = slot.end;

  const event = await createMeetEvent({
    summary: `Website Meeting: ${name}`,
    description: requirements.join("\n"),
    start, end,
    attendees: [email, process.env.ADMIN_EMAIL!]
  });

  await transporter.sendMail({
    from: process.env.EMAIL_SMTP_USER,
    to: [email, process.env.ADMIN_EMAIL],
    subject: "Your Scheduled Website Meet & Details",
    text: `
Your Google Meet is set at ${new Date(start).toLocaleString()}:
${event.hangoutLink}

Your requirements:
${requirements.join(", ")}
    `
  });

  return NextResponse.json({ hangoutLink: event.hangoutLink });
}
