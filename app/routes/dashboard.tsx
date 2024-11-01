import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { connectDB } from '../utils/db';
import Customer from '~/Models/Customer';

export async function loader() {
	try {
		connectDB();
		const data = await Customer.find();
		console.log(data);
		return json(data, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ error: err }, { status: 500 });
	}
}

const Dashboard = () => {
	const data = useLoaderData<typeof loader>();
	console.log(data);

	// Add delete functionality
	return (
		<div className="flex justify-center items-center h-screen  flex-col">
			<Link to="/">Home</Link>
			<h1>Data</h1>
			<h2>Customers:</h2>

			<div className="flex flex-col justify-between gap-2">
				{data.map((customer) => (
					<div key={customer._id}>
						<div>{customer.name}</div>
						<div>{customer.email}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
