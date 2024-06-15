import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Retrieve user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const userProfile = await User.findById(id).select("-password");
    if (!userProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update an existing user profile
export const updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body; // Object containing fields to update
 
    if (updates.password) { // Hash the password before saving
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    const userProfile = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }); 

    if (!userProfile) {// If user not found, return 404
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.log("Error in updateUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
