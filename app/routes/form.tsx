import { ActionFunctionArgs } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import Customer from '~/Models/Customer';
import { connectDB } from '~/utils/db';
export async function action({ request }: ActionFunctionArgs) {
	connectDB();
	const formData = await request.formData();
	const name = String(formData.get('name'));
	const email = String(formData.get('email'));
	try {
		const newCustomer = new Customer({
			name: name,
			email: email,
		});

		console.log('New Customer', newCustomer);
		const result = await newCustomer.save();
		console.log('Result', result);
		return result;
	} catch (err) {
		console.error(err);
	}
}

const FormComponent = () => {
	return (
		<div>
			<Link to="/">Home</Link>
			<Form
				method="post"
				className="flex flex-col items-center justify-center h-screen gap-4"
			>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" className="border" name="name" />
				<label htmlFor="email">Email</label>
				<input type="text" id="email" className="border" name="email" />
				<button type="submit" className="border border-b-2 p-2 rounded-xl">
					Submit
				</button>
			</Form>
		</div>
	);
};

export default FormComponent;
