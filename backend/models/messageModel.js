import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    message: { type: String, required: true }, // Message content
    isRead: { type: Boolean, default: false }, // Message read status
  },
  { timestamps: true } // createdAt and updatedAt timestamps
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
