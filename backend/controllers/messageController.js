import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }, // Find conversation with both sender and receiver
    });

    if (!conversation) {
      // If it the first message between the two users, create a new conversation
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      // If message is created successfully
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO IMPLEMENTATION TO MAKE IT REAL TIME

    // Run in parallel, reduce time complexity
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({ error: error, message: "Server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages"); // Retrieve all messages in the conversation

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getConversation: ", error);
    res.status(500).json({ error: error, message: "Server error" });
  }
};
