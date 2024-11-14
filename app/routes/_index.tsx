import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Form, useLoaderData } from '@remix-run/react';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import authenticator from '~/services/auth.server';
export const meta: MetaFunction = () => {
	return [
		{ title: 'QR Scanner' },
		{ name: 'description', content: 'Marketing Automation App' },
	];
};

export let loader: LoaderFunction = async ({ request }) => {
	return await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	});
};

export const action: ActionFunction = async ({ request }) => {
	await authenticator.logout(request, { redirectTo: '/login' });
};

export default function Index() {
	const data = useLoaderData();
	console.log(data);
	return (
		<div className="flex justify-center h-screen items-center flex-col">
			<Link to="/Dashboard" className="items-start">
				Dashboard
			</Link>
			<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
				<h1>Welcome to a Remix Protected Dashboard</h1>
				<p>
					{data?.name} {data?.token}
				</p>
				<Form method="post">
					<button>Log Out</button>
				</Form>
			</div>
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
