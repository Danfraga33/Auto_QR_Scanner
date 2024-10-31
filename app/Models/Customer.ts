import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		purchased: Boolean,
		amountPurchased: Number,
		phone: String,
	},
	{ collection: 'Customers' }
);

export default mongoose.models?.Customer ||
	mongoose.model('Customer', customerSchema);
