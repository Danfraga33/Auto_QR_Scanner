import Campaign from "~/Models/Campaign";
import { connectDB } from "./db";
import Accounts from "~/Models/Accounts";

export async function createProfile({
  email,
  password,
  companyName,
  companyEmail,
  companyPhoneNumber,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  companyName: FormDataEntryValue | null;
  companyEmail: FormDataEntryValue | null;
  companyPhoneNumber: FormDataEntryValue | null;
}) {
  try {
    connectDB();
    const newProfile = new Accounts({
      email,
      password,
      companyName,
      companyEmail,
      companyPhoneNumber,
    });

    if (!companyName || !companyEmail || !companyPhoneNumber) {
      throw new Error("Missing required fields");
    }
    const newBusiness = await newProfile.save();
    console.log("New Business Saved:", newBusiness);
    return newBusiness;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCampaign({
  campaignId,
  name,
  freq,
}: {
  name: FormDataEntryValue | null;
  freq: FormDataEntryValue | null;
  campaignId: string;
}) {
  connectDB();
  const updatedData = { name, freq };
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      updatedData,
      {
        new: true,
        upsert: true,
      },
    );

    return {
      success: true,
      message: "Successfully updated campaign",
      updatedCampaign,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update campaign",
      error,
    };
  }
}

export async function getCampaign() {
  connectDB();
  try {
    const data = await Campaign.find();
    return data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to fetch all campaigns",
      err,
    };
  }
}

export async function selectedCampaign(id: string) {
  connectDB();
  try {
    const selectedCampaign = await Campaign.findOne({ id });
    return selectedCampaign;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch selected campaign",
      error,
    };
  }
}
export async function deleteCampaign(id: string) {
  try {
    connectDB();
    const result = await Campaign.deleteOne({ _id: id });
    return { success: true, message: "All campaigns deleted", result };
  } catch (error) {
    return { success: false, message: "Failed to delete campaigns", error };
  }
}

export async function createCampaign({
  name,
  strategy,
  startDate,
  startTime,
  schedule,
  freq,
  status,
  endDate,
}: {
  name: FormDataEntryValue | null;
  strategy: FormDataEntryValue | null;
  startDate: FormDataEntryValue | null;
  startTime: FormDataEntryValue | null;
  schedule: Date[];
  freq: FormDataEntryValue | null;
  endDate: FormDataEntryValue | null;
  status: string;
}) {
  const newCampaign = new Campaign({
    name,
    strategy,
    freq,
    startTime,
    startDate,
    schedule,
    status,
    endDate,
  });

  const result = await newCampaign.save();
  console.log("Campaign Saved:", result);
  return result;
}
