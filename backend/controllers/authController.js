import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    console.log("req.body: ", req.body);

    // Check if password & confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }
    // Check if username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image = `https://robohash.org/${username}.png/set_set1/bgset_bg1/3.14159?size=300x300`;

    // User Schema
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: image,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    await newUser.save(); // Save user to database

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      password: newUser.password,
      profilePicture: newUser.profilePicture,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Server error" });
  }
};
