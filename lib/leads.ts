import { NextResponse } from 'next/server';

export type FieldSpec = {
  name: string;
  label: string;
  required?: boolean;
  kind?: 'text' | 'email' | 'phone';
  max?: number;
};

export type LeadResult =
  | { ok: true; values: Record<string, string> }
  | { ok: false; response: NextResponse };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+\d][\d\s-]{7,17}$/;

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Validates and sanitizes an inbound lead payload server-side. Never trust the
 * client: the browser form is a convenience, this is the actual gate.
 */
export async function readLead(
  request: Request,
  fields: FieldSpec[],
): Promise<LeadResult> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return { ok: false, response: bad('Malformed request body.') };
  }

  if (typeof payload !== 'object' || payload === null) {
    return { ok: false, response: bad('Malformed request body.') };
  }
  const raw = payload as Record<string, unknown>;

  // Honeypot: a filled hidden field means a bot. Accept silently so the bot
  // does not learn it was rejected, but never record the row.
  if (typeof raw.companyWebsite === 'string' && raw.companyWebsite.trim()) {
    return {
      ok: false,
      response: NextResponse.json({ ok: true, skipped: true }),
    };
  }

  const values: Record<string, string> = {};

  for (const field of fields) {
    const value = typeof raw[field.name] === 'string' ? (raw[field.name] as string).trim() : '';

    if (!value) {
      if (field.required === false) continue;
      return { ok: false, response: bad(`${field.label} is required.`) };
    }
    if (value.length > (field.max ?? 300)) {
      return { ok: false, response: bad(`${field.label} is too long.`) };
    }
    if (field.kind === 'email' && !EMAIL.test(value)) {
      return { ok: false, response: bad('Please enter a valid email address.') };
    }
    if (field.kind === 'phone' && !PHONE.test(value)) {
      return { ok: false, response: bad('Please enter a valid phone number.') };
    }
    values[field.name] = value;
  }

  return { ok: true, values };
}

/**
 * Appends a lead to the configured Google Sheet.
 *
 * INTEGRATION POINT — not yet wired to live credentials.
 * Per the frontend architecture document, a Google Cloud service account is
 * scoped to the target spreadsheet (shared with the service account email; no
 * Drive-wide access). To activate:
 *
 *   1. npm install googleapis
 *   2. Set GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL and
 *      GOOGLE_PRIVATE_KEY as server-side env vars (never NEXT_PUBLIC_*).
 *   3. Replace the body below with sheets.spreadsheets.values.append,
 *      writing B2C contact and B2B institutional leads to separate tabs.
 *
 * Until then the lead is logged server-side so nothing is silently dropped,
 * and the caller still gets a success response.
 */
export async function recordLead(tab: string, values: Record<string, string>) {
  const configured =
    process.env.GOOGLE_SHEETS_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY;

  if (!configured) {
    console.info(
      `[lead:${tab}] Google Sheets not configured — captured payload:`,
      values,
    );
    return { delivered: false as const };
  }

  // TODO: append via googleapis once the service account is provisioned.
  console.info(`[lead:${tab}] Sheets credentials present; append not yet implemented.`);
  return { delivered: false as const };
}

export function leadOk() {
  return NextResponse.json({ ok: true });
}
