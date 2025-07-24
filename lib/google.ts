// lib/google.ts
import { google } from "googleapis";

const oAuth2 = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
oAuth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

export const calendar = google.calendar({ version: "v3", auth: oAuth2 });

export async function createMeetEvent({
  summary, description, start, end, attendees
}: {
  summary: string;
  description: string;
  start: string;
  end: string;
  attendees: string[];
}) {
  const { data } = await calendar.events.insert({
    calendarId: process.env.CALENDAR_ID!,
    conferenceDataVersion: 1,
    requestBody: {
      summary,
      description,
      start: { dateTime: start },
      end:   { dateTime: end },
      attendees: attendees.map(email => ({ email })),
      conferenceData: { createRequest: { requestId: `meet-${Date.now()}` } }
    }
  });
  return data;
}
