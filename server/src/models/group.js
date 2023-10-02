import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GroupMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      auto: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Moderator", "Normal"],
      default: "Normal",
      required: true,
    },
  },
  { _id: false }
);

const GroupModelSchema = new Schema(
  {
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    tags: {
      type: [Schema.Types.String],
      required: false,
      maxlength: 12,
    },
    members: [GroupMemberSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", GroupModelSchema);

export default Group;



