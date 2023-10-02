import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
      select: false, // to not return the password in the response
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    joinedGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // to add createdAt and updatedAt
  }
);

const User = model("User", userSchema);
export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         photo:
 *           type: string
 *           description: The photo of the user
 *         bio:
 *           type: string
 *           description: The bio of the user
 *         joinedAt:
 *           type: string
 *           description: The joinedAt of the user
 *         lastLogin:
 *           type: string
 *           description: The lastLogin of the user
 *         friends:
 *           type: string
 *           description: list of friends of the user
 *           example:
 *            id: 60f7b1b8c9e9a61f0c9b4b1a
 *            username: Eyad
 *            name: Eyad Sholdom
 *            photo: Base64
 *            bio: I am a software engineer
 *            joinedAt: 2021-07-21T12:00:00.000Z
 *            joinedGroups: [60f7b1b8c9e9a61f0c9b4b1a, 60f7b1b8c9e9a61f0c9b4b1a]
 *
 *
 */
