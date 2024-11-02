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
	let totalRevenue = data.reduce(
		(total: number, customer) => total + customer.amount,
		0
	);

	// Add delete functionality
	return (
		<div className="flex justify-center items-center h-screen  flex-col">
			<div className="flex flex-col justify-between gap-2">
				<Link to="/" className="flex justify-center item">
					Home
				</Link>
				<h1 className="flex justify-center item">Data</h1>
				<h2 className="flex justify-center item">Customers:</h2>
				{data.map((customer) => (
					<div key={customer._id}>
						<div>{customer.name}</div>
						<div>{customer.email}</div>
						<label htmlFor="purchased" className="mr-2">
							Purchased
						</label>
						{customer.Purchased ? (
							<input type="checkbox" id="purchased" checked readOnly />
						) : (
							<input type="checkbox" id="purchased" readOnly />
						)}

						<p>
							Amount Purchased: <span> {customer.amount}</span>
						</p>
					</div>
				))}
				<h3>Total Campaign Revenue: {totalRevenue}</h3>
			</div>
		</div>
	);
};

export default Dashboard;
