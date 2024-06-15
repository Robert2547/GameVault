import express from "express";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.post("/send/:id", messageController.sendMessage); // Send a message to another user

// router.get("/conversations", messageController.getConversations); // Get all conversations of a user

// router.get("/messages/:conversationId", messageController.getMessages); // Get all messages of a conversation

export default router;
