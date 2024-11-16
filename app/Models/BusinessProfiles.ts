import mongoose from 'mongoose';

const BusinessProfileSchema = new mongoose.Schema({
	companyName: { type: String },
	companyEmail: { type: String },
	companyPhoneNumber: { type: String },
});

export default mongoose.models.BusinessProfile ||
	mongoose.model('BusinessProfile', BusinessProfileSchema);
