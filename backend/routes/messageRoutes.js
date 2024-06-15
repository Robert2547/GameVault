import express from "express";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.get("/:id", messageController.getConversation); // Get conversation between two users

router.post("/send/:id", messageController.sendMessage); // Send a message to another user

export default router;
