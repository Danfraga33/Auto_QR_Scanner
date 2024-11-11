import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'QR Scanner' },
		{ name: 'description', content: 'Marketing Automation App' },
	];
};

export default function Index() {
	return (
		<div className="flex justify-center h-screen items-center flex-col">
			<Link to="/Dashboard" className="items-start">
				Dashboard
			</Link>
			<Link to="/form" className="items-start">
				Form
			</Link>
			<Link to="/campaignBuilder" className="items-start">
				Campaign Builder
			</Link>
			<Link to="/login" className="items-start">
				Signup
			</Link>
		</div>
	);
}

let user = await authenticator.isAuthenticated(request, {
	failureRedirect: '/login',
});

// if the user is authenticated, redirect to /dashboard
let user = await authenticator.isAuthenticated(request, {
	failureRedirect: '/login',
});

// if the user is authenticated, redirect to /dashboard
await authenticator.isAuthenticated(request, {
	successRedirect: '/dashboard',
});

// get the user or null, and do different things in your loader/action based on
// the result
user = await authenticator.isAuthenticated(request);
if (user) {
	// here the user is authenticated
} else {
	// here the user is not authenticated
}
