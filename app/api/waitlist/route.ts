import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function serverError(message: string) {
  console.error(`[waitlist] ${message}`);
  return NextResponse.json(
    { error: "Inschrijven lukt nu even niet. Probeer het later opnieuw." },
    { status: 502 },
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const { email: rawEmail, website } = body as {
    email?: unknown;
    website?: unknown;
  };

  // Honeypot: bots tend to fill this invisible field. Return a normal response
  // so they do not learn how the filter works.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  if (typeof rawEmail !== "string") {
    return NextResponse.json(
      { error: "Vul een geldig e-mailadres in." },
      { status: 400 },
    );
  }

  const email = rawEmail.trim().toLowerCase();
  if (email.length > 320 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Vul een geldig e-mailadres in." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID;

  if (!apiKey || !segmentId) {
    return serverError("Resend environment variables are not configured");
  }

  const resend = new Resend(apiKey);
  const existingContact = await resend.contacts.get({ email });

  if (existingContact.error?.name === "not_found") {
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });

    if (created.error) {
      return serverError(`Resend create failed (${created.error.name})`);
    }

    return NextResponse.json({ success: true });
  }

  if (existingContact.error) {
    return serverError(`Resend lookup failed (${existingContact.error.name})`);
  }

  // A new, explicit signup opts this contact back in. This site currently has
  // one mailing purpose: updates about the book.
  if (existingContact.data.unsubscribed) {
    const updated = await resend.contacts.update({
      email,
      unsubscribed: false,
    });

    if (updated.error) {
      return serverError(`Resend update failed (${updated.error.name})`);
    }
  }

  const currentSegments = await resend.contacts.segments.list({ email });
  if (currentSegments.error) {
    return serverError(
      `Resend segment lookup failed (${currentSegments.error.name})`,
    );
  }

  const isAlreadyOnWaitlist = currentSegments.data.data.some(
    (segment) => segment.id === segmentId,
  );

  if (!isAlreadyOnWaitlist) {
    const added = await resend.contacts.segments.add({ email, segmentId });
    if (added.error) {
      return serverError(`Resend segment add failed (${added.error.name})`);
    }
  }

  return NextResponse.json({ success: true });
}
