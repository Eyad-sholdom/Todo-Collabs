import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", tokenSchema);

export default Token;
