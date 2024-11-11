import Campaign from '~/Models/Campaign';
import { connectDB } from './db';

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
