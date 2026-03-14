import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
				<meta
					name="description"
					content="The page you are looking for does not exist."
				/>
				<meta name="keywords" content="404, page not found, error" />
				<meta property="og:image" content="/og-default.png" />
				<meta property="og:type" content="website" />
				<meta name="robots" content="noindex" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-zinc-900 mb-4">404</h1>
					<h2 className="text-2xl font-semibold text-zinc-700 mb-4">
						Page Not Found
					</h2>
					<p className="text-zinc-600 mb-8">
						The page you are looking for does not exist.
					</p>
					<Link
						href="/"
						className="inline-block px-6 py-3 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors"
					>
						Go Back Home
					</Link>
				</div>
			</div>
		</>
	);
}
