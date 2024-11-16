import mongoose from 'mongoose';

const accountsSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	companyName: { type: String },
	companyEmail: { type: String },
	companyPhoneNumber: { type: String },
});

export default mongoose.models?.account ||
	mongoose.model('account', accountsSchema);
