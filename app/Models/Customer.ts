import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		purchased: { type: Boolean, default: false },
		amountPurchased: { type: Number, default: 0.0 },
		phone: String,
	},
	{ collection: 'Customers' }
);

export default mongoose.models?.Customer ||
	mongoose.model('Customer', customerSchema);
