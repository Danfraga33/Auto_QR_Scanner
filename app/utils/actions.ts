import Campaign from '~/Models/Campaign';
import { connectDB } from './db';
import Accounts from '~/Models/Accounts';

export async function createProfile({
	email,
	password,
	companyName,
	companyEmail,
	companyPhoneNumber,
}: {
	email: FormDataEntryValue | null;
	password: FormDataEntryValue | null;
	companyName: FormDataEntryValue | null;
	companyEmail: FormDataEntryValue | null;
	companyPhoneNumber: FormDataEntryValue | null;
}) {
	try {
		connectDB();
		const newProfile = new Accounts({
			email,
			password,
			companyName,
			companyEmail,
			companyPhoneNumber,
		});

		if (!companyName || !companyEmail || !companyPhoneNumber) {
			throw new Error('Missing required fields');
		}
		const newBusiness = await newProfile.save();
		console.log('New Business Saved:', newBusiness);
		return newBusiness;
	} catch (error) {
		console.error(error);
	}
}

export async function getCampaign() {
	connectDB();
	try {
		const data = await Campaign.find();
		console.log(data);
		return data;
	} catch (err) {
		console.error('Failed to fetch all campaigns');
	}
}

export async function createCampaign({
	name,
	method,
	campaignType,
	startDate,
	endDate,
}: {
	name: FormDataEntryValue | null;
	method: FormDataEntryValue | null;
	campaignType: FormDataEntryValue | null;
	startDate: FormDataEntryValue | null;
	endDate: FormDataEntryValue | null;
}) {
	const newCampaign = new Campaign({
		name,
		method,
		campaignType,
		startDate,
		endDate,
	});

	const result = await newCampaign.save();
	console.log('Campaign Saved:', result);
	return result;
}
