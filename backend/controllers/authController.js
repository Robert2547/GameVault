import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie  from "../utils/generateToken.js";

// Signup a new user
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

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

    const sanitizedUsername = username.replace(/\s+/g, ""); // Remove white spaces from username
    const image = `https://robohash.org/${sanitizedUsername}.png/set_set1/bgset_bg1/3.14159?size=300x300`;

    // User Schema
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: image,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    generateTokenAndSetCookie(newUser.id, res); // Generate JWT token and set cookie

    await newUser.save(); // Save user to database

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
    console.log("User created successfully");
  } catch (error) {
    console.log("Signup error: ", error);
    res.status(500).json({ error: error, message: "Server error" });
  }
};

// Login an existing user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    // Check if password is correct & user exists
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res); // Generate JWT token and set cookie

    // Send user data
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    console.log(`${user.username} logged in successfully`);
  } catch (error) {
    console.log("Login error: ", error);
    res.status(500).json({ error: error, message: "Server error" });
  }
};

// Logout a user
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, history: true }); // Clear cookie

    res.status(200).json({ success: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error: ", error);
    res.status(500).json({ error: error, message: "Server error" });
  }
};
