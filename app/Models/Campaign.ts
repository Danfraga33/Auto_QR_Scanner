import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  freq: { type: String, required: true },
  method: { type: String, required: true, default: "Email" },
});

export default mongoose.models?.Campaign ||
  mongoose.model("Campaign", campaignSchema);
