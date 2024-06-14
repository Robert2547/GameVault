import IGDB_auth from "../models/authModel.js";
import { generateIGDBToken } from "../utils/igdbToken.js";

export const checkToken = async (req, res, next) => {
  try {
    // Check if IGDB_CLIENT_ID and IGDB_CLIENT_SECRET exist
    if (!process.env.IGDB_CLIENT_ID || !process.env.IGDB_CLIENT_SECRET) {
      console.log("IGDB Authentication details not set");
      throw new Error("IGDB Authentication details not set");
    }

    // Find IGDB Authentication details from database
    let tokenData = await IGDB_auth.findOne();

    // Check if token is expired or not found, generate new token & save to database
    if (!tokenData || Date.now() >= tokenData.expires_at) {

      const data = await generateIGDBToken(); // Generate new IGDB token

      const newTokenData = {
        access_token: data.access_token,
        expires_at: Date.now() + data.expires_in * 1000, // Convert seconds to milliseconds
      };


      if (!newTokenData) {
        console.log("Error in generating newTokenData");
        throw new Error("Error in generating newtokenData");
      }

      if (tokenData) {
        // Update existing token data
        tokenData.access_token = newTokenData.access_token;
        tokenData.expires_at = newTokenData.expires_at;
        await tokenData.save();
        console.log("Token updated in database");
      } else {
        tokenData = new IGDB_auth(newTokenData); // Create new token data
        await tokenData.save(); // Save new token data to database
        console.log("New token saved to database");
      }
    }
    next();
  } catch (error) {
    console.log("Error in checkToken:", error.message);
    res.status(500).json({ error: error, message: "Server error" });
  }
};
