import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    access_token: { type: String, required: true },
    expires_at: { type: Number, required: true },
    token_type: { type: String, default: "bearer" },
  },
  { timestamps: true }
);

const IGDB_auth = mongoose.model("IGDB_auth", authSchema);

export default IGDB_auth;
