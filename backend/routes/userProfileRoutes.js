import express from "express";
import * as userProfileController from "../controllers/userProfileController.js";
const router = express.Router();

router.get("/:id", userProfileController.getUserProfile);

router.put("/:id", userProfileController.updateUserProfile);

export default router;
