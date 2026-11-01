import { createHmac } from "node:crypto";

/*
 * The invitations' QR codes point at real-site's RSVP pages,
 * /<type>-<code> (1s/2s/3s = one/two/three guests in Stockholm, 1t/2t/3t
 * the same in Toronto). <code> is an HMAC of the type with
 * GUEST_ACCESS_SECRET — the same secret and formula as real-site's
 * src/lib/guests.ts, so the printed codes work here now and on the real
 * site later. The codes aren't in this (public) repo: without the secret
 * set, no address matches and everything goes to the home page.
 */

const TYPES = ["1s", "2s", "3s", "1t", "2t", "3t"] as const;
type InvitationType = (typeof TYPES)[number];

const slugFor = (type: InvitationType, secret: string) =>
	`${type}-${createHmac("sha256", secret).update(`rsvp:${type}`).digest("hex").slice(0, 12)}`;

/** City and number of guests for a QR address, or null if it isn't one. */
export function invitationFor(slug: string): { city: "Stockholm" | "Toronto"; guests: 1 | 2 | 3 } | null {
	const secret = process.env.GUEST_ACCESS_SECRET;
	const type = secret ? TYPES.find((t) => slugFor(t, secret) === slug) : undefined;
	if (!type) return null;
	return { city: type[1] === "s" ? "Stockholm" : "Toronto", guests: Number(type[0]) as 1 | 2 | 3 };
}
