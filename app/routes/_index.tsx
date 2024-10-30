import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{ title: 'QR Scanner' },
		{ name: 'description', content: 'Marketing Automation App' },
	];
};

export default function Index() {
	return (
		<>
			<Link to="/Dashboard">Dashboard</Link>
			<Link to="/form">Form</Link>
		</>
	);
}
