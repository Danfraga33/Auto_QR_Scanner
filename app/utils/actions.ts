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
	date,
}: {
	name: string;
	method: string;
	campaignType: string;
	date: string;
}) {
	const newCampaign = new Campaign({
		name,
		method,
		campaignType,
		date,
	});

	const result = await newCampaign.save();
	console.log('Campaign Saved:', result);
	return result;
}
