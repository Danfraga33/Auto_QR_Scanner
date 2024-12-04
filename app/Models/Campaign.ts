import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  strategy: { type: String, required: true, default: "Email" },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  freq: { type: String, required: true },
  endDate: { type: String, required: true },
  schedule: { type: [Date], required: true },
});

export default mongoose.models?.Campaign ||
  mongoose.model("Campaign", campaignSchema);
