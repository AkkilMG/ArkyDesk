/**
 * Structured security event log.
 *
 * ISO 27001:2022 A.8.15 (logging) and A.8.16 (monitoring activities) require
 * authentication and access-control decisions to be recorded in a form that can
 * be reviewed and alerted on.
 *
 * Design constraints:
 *  - Never log credentials, session tokens, password hashes or full IP addresses.
 *  - Never throw: a logging failure must not take down the request it describes.
 *  - Emitted as single-line JSON so it can be shipped to Cloudflare Logpush or
 *    any aggregation pipeline without further parsing.
 */

type SecurityEventName =
  | "auth.signin"
  | "auth.signin_failed"
  | "auth.signout"
  | "auth.signup"
  | "auth.guest_link_issued"
  | "auth.guest_link_consumed"
  | "auth.rate_limited"
  | "access.denied"
  | "account.password_changed"
  | "account.deleted";

type SecurityEventFields = Record<string, string | number | boolean | undefined>;

const REDACTED = "[redacted]";

/** Keys that must never reach the log, even if a caller passes them. */
const FORBIDDEN_KEYS = new Set([
  "password",
  "newPassword",
  "currentPassword",
  "confirmPassword",
  "token",
  "session",
  "cookie",
  "authorization",
  "secret",
  "ip",
]);

function sanitize(fields: SecurityEventFields): SecurityEventFields {
  const output: SecurityEventFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    output[FORBIDDEN_KEYS.has(key) ? REDACTED : key] = value;
  }
  return output;
}

export function logSecurityEvent(event: SecurityEventName, fields: SecurityEventFields = {}) {
  try {
    const entry = {
      ts: new Date().toISOString(),
      channel: "security",
      event,
      ...sanitize(fields),
    };
    // console.log keeps the payload as a single JSON line, which is what log
    // pipelines expect. Swap for a transport (Logpush, Sentry, …) as needed.
    console.log(JSON.stringify(entry));
  } catch {
    // Logging must never break the request path.
  }
}
