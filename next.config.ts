import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			// While the site is "coming soon", every URL lands on the home page.
			// Temporary (307), not permanent: real-site will later serve these
			// paths for real, and browsers cache permanent redirects.
			{ source: "/stockholm", destination: "/", permanent: false },
			{ source: "/toronto", destination: "/", permanent: false },
			// Catch-all for any other path. Excludes the embedded Studio and
			// Next's own assets, which must keep working.
			{
				source: "/:path((?!studio(?:/|$)|_next/|favicon\\.ico$).+)",
				destination: "/",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
