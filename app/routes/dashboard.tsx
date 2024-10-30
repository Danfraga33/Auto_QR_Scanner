import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { connectDB } from '../utils/db';
import Customers from '~/Models/Customer';

export async function loader() {
	try {
		connectDB();
		const data = await Customers.find();
		console.log(data);
		return json(data, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ error: err }, { status: 500 });
	}
}

const Dashboard = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8 mx-auto">
			<Link to="/">Home</Link>
			<h1>Data</h1>
			<p>Data: {JSON.stringify(data)}</p>
		</div>
	);
};

export default Dashboard;
