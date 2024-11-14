import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await request.formData();
	const companyName = data.get('companyName');
	console.log(companyName);
	return companyName;
};

const SignupForm = () => {
	return (
		<>
			<Form className="flex justify-center gap-2 items-center h-screen flex-col">
				<label htmlFor="companyName">Company Name</label>
				<input
					type="text"
					id="companyName"
					name="companyName"
					className="border border-black rounded-lg px-2 py-1"
				/>
				<label htmlFor="companyEmail">Company Email</label>
				<input
					type="text"
					id="companyEmail"
					name="companyEmail"
					className="border border-black rounded-lg px-2 py-1"
				/>
				<label htmlFor="companyNumber">Company Phone Number</label>
				<input
					type="text"
					id="companyNumber"
					name="companyNumber"
					className="border border-black rounded-lg px-2 py-1"
				/>
				<button
					type="submit"
					className="border border-black px-2 py-1 rounded-lg hover:bg-gray-200 hover:transition-all"
				>
					Submit
				</button>
			</Form>
		</>
	);
};

export default SignupForm;
