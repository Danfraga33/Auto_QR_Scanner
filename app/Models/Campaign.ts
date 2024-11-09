import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
	name: { type: String, required: true },
	campaignType: { type: String, required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
	date: { type: String, required: true },
	method: { type: String, required: true },
});

export default mongoose.models?.Campaign ||
	mongoose.model('Campaign', campaignSchema);
