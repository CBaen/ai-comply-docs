import crypto from "crypto";

const _SECRET = process.env.STRIPE_SECRET_KEY;
if (!_SECRET) throw new Error("STRIPE_SECRET_KEY is not set — delivery tokens cannot be issued.");
const SECRET: string = _SECRET;

export function generateDeliveryToken(sessionId: string): string {
  const payload = sessionId + "|" + Math.floor(Date.now() / 60000); // 1-minute granularity
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function validateDeliveryToken(sessionId: string, token: string): boolean {
  const now = Math.floor(Date.now() / 60000);
  // Check current minute and previous 14 minutes (15-minute window)
  for (let i = 0; i <= 14; i++) {
    const payload = sessionId + "|" + (now - i);
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token))) {
      return true;
    }
  }
  return false;
}
