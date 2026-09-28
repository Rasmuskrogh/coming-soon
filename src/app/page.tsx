import type { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { Cormorant_Garamond } from "next/font/google";
import { client } from "@/sanity/lib/client";
import styles from "./page.module.css";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400"],
	style: ["normal", "italic"],
});

type ComingSoon = { heading?: string; subheading?: string; metaTitle?: string };

// Re-fetch from Sanity at most once a minute so Studio edits go live
// without a redeploy.
export const revalidate = 60;

const COMING_SOON_QUERY = defineQuery(
	`*[_id == "comingSoon"][0]{ heading, subheading, metaTitle }`,
);

// Falls back to plain "Coming soon" if the document isn't published yet
// or Sanity is unreachable — this page should never render an error.
async function getContent() {
	return client.fetch<ComingSoon | null>(COMING_SOON_QUERY).catch(() => null);
}

export async function generateMetadata(): Promise<Metadata> {
	const content = await getContent();
	return { title: content?.metaTitle || content?.heading || "Coming soon" };
}

export default async function ComingSoonPage() {
	const content = await getContent();

	return (
		<main className={`${styles.wrap} ${cormorant.className}`}>
			<div className={styles.inner}>
				<span className={styles.rule} aria-hidden="true" />
				<h1 className={styles.title}>{content?.heading || "Coming soon"}</h1>
				{content?.subheading && <p className={styles.subtitle}>{content.subheading}</p>}
				<span className={styles.rule} aria-hidden="true" />
			</div>
		</main>
	);
}
