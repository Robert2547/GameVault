import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    // Check if MONGO_DB_URL is defined in .env file
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGO_DB_URL is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URL); // Connect to MongoDB
  } catch (error) {
    console.error("Error in connectToMongoDB: ", error);
  }
};

export default connectToMongoDB;
