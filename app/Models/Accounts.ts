import mongoose from 'mongoose';

const accountsSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String },
	companyName: { type: String },
	companyEmail: { type: String },
	companyPhoneNumber: { type: String },
});

export default mongoose.models?.account ||
	mongoose.model('account', accountsSchema);
