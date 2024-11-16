import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp } from '@clerk/remix';

import './tailwind.css';

export const links: LinksFunction = () => [
	// ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	// { rel: 'stylesheet', href: stylesheet },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

export const loader: LoaderFunction = (args) => {
	return rootAuthLoader(args, ({ request }) => {
		const { sessionId, userId, getToken } = request.auth;
		// fetch data
		return { yourData: 'here' };
	});
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function App() {
	return <Outlet />;
}

export default ClerkApp(App);
