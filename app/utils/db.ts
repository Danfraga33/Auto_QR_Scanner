import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://danfraga33:Z1VFYIiGe2AVPL7D@cluster0.1qjpo.mongodb.net/CustomerData?retryWrites=true&w=majority&appName=Cluster0",
    );
    console.log("Connection state:", mongoose.connection.readyState);
  } catch (error) {
    console.log({
      success: false,
      message: "Failed to connect to mongoDB",
      error,
    });
  }
}
