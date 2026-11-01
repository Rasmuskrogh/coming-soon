import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			// While the site is "coming soon", every URL lands on the home page.
			// Temporary (307), not permanent: real-site will later serve these
			// paths for real, and browsers cache permanent redirects.
			{ source: "/stockholm", destination: "/", permanent: false },
			{ source: "/toronto", destination: "/", permanent: false },
			// Catch-all for any other path. Excludes the embedded Studio, Next's
			// own assets, and the invitations' QR addresses (/1s-<code> …),
			// which src/app/[slug] shows — or sends here itself if the code
			// is wrong.
			{
				source: "/:path((?!studio(?:/|$)|_next/|favicon\\.ico$|[123][st]-[0-9a-f]{12}$).+)",
				destination: "/",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
