import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunction, redirect } from '@remix-run/node';
import React from 'react';
import { createClerkClient } from '@clerk/remix/api.server';
import { connectDB } from '~/utils/db';
import Accounts from '~/Models/Accounts';

export const loader: LoaderFunction = async (args) => {
	const { userId } = await getAuth(args);

	// If there is no userId, then redirect to sign-in route
	if (!userId) {
		return redirect('/sign-in?redirect_url=' + args.request.url);
	}
	const user = await createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	}).users.getUser(userId);

	try {
		connectDB();
		const accountData = new Accounts({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.emailAddresses[0].emailAddress,
		});
		const result = await accountData.save();
		console.log('account saved:', result);
	} catch (error) {
		console.error('Error saving user to MongoDB:', error);
		throw new Error('Failed to save user to database');
	}

	return redirect('/Dashboard');
};

const Redirect = () => {
	return null;
};

export default Redirect;
