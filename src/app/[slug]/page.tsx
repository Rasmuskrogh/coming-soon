import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { invitationFor } from "@/lib/invitation";
import styles from "../page.module.css";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400"],
	style: ["normal", "italic"],
});

const GUESTS = { 1: "One guest", 2: "Two guests", 3: "Three guests" } as const;

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Where the invitations' QR codes land until real-site goes live: which
 * city and how many guests the card is for. Any other address goes to
 * the coming-soon page, as before (see next.config.ts).
 */
export default async function InvitationPage({ params }: PageProps<"/[slug]">) {
	const invitation = invitationFor((await params).slug);
	if (!invitation) redirect("/");

	return (
		<main className={`${styles.wrap} ${cormorant.className}`}>
			<div className={styles.inner}>
				<span className={styles.rule} aria-hidden="true" />
				<h1 className={styles.title}>{invitation.city}</h1>
				<p className={styles.subtitle}>{GUESTS[invitation.guests]}</p>
				<span className={styles.rule} aria-hidden="true" />
			</div>
		</main>
	);
}
