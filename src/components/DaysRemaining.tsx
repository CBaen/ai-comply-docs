"use client";

import { useEffect, useState } from "react";

/**
 * DaysRemaining — Client-side countdown to a target date.
 *
 * Renders nothing on the server (returns null on first render to avoid
 * hydration mismatch with server-side date math). After mount, renders
 * "N days remaining" computed from client clock.
 *
 * After the target date passes, renders nothing (caller should also
 * remove this component when status flips to "in-effect"; this is a
 * defense-in-depth zero return).
 */
export default function DaysRemaining({ targetDate }: { targetDate: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) return;
    const remaining = Math.ceil((target - Date.now()) / 86400000);
    setDays(remaining > 0 ? remaining : 0);
  }, [targetDate]);

  if (days === null || days <= 0) return null;
  return <>{days} days remaining</>;
}
