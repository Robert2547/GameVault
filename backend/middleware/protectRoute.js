import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // If token is not present (user is not logged in)
      return res
        .status(401)
        .json({ error: "You must be logged in to access this route" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    if (!decoded) {
      // If token is invalid (user is not logged in)
      return res
        .status(401)
        .json({ error: "You must be logged in to access this route" });
    }

    const user = await User.findById(decoded.id).select("-password"); // Get user data, excluding password
    if (!user) {
      // User is not found in database
      return res
        .status(404)
        .json({ error: "User not found, please register again" });
    }

    req.user = user; // Set user data in request object
    next(); // Move to next middleware
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
