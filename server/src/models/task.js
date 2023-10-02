import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TaskModelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
      ref: "Group.tags",
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "done"],
      default: "not-started",
    },
    priority: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "none",
    },
    dueDate: {
      type: Date,
      required: false,
    },
    comments: [
      {
        createdAt: {
          type: Date,
          default: Date.now,
        },
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        commentData: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Task = model("Task", TaskModelSchema);

export default Task;

/*
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - Title
 *         - description
 *         - tags
 *         - status
 *         - priority
 *         - dueDate
 *         - createdBy
 *         - comments
 *         - assignedTo
 *       properties:
 *         Title:
 *           type: string
 *           description: The title of the task
 *           example: "Task 1"
 *         description:
 *           type: string
 *           description: The description of the task
 *           example: "Task 1 description"
 *         tags:
 *           type: array
 *           description: The tags of the task
 *           items:
 *             type: string
 *             example: "tag1"
 *           example: ["tag1", "tag2"]
 *         status:
 *           type: string
 *           description: The status of the task
 *           enum: ["not-started", "in-progress", "done"]
 *           example: "in-progress"
 *         priority:
 *           type: string
 *           description: The priority of the task
 *           enum: ["none", "low", "medium", "high"]
 *           example: "none"
 *         dueDate:
 *           type: string
 *           description: The due date of the task
 *           format: date
 *           example: "2022-01-01"
 *         comments:
 *           type: array
 *           description: The comments of the task
 *           items:
 *             type: object
 *             properties:
 *               createdAt:
 *                 type: string
 *                 description: The date of the comment
 *                 format: date
 *                 example: "2022-01-01"
 *               commentBy:
 *                 type: string
 *                 description: The user who made the comment
 *                 example: "user1"
 *               commentData:
 *                 type: string
 *                 description: The comment data
 *                 example: "comment 1"
 *         createdBy:
 *           type: string
 *           description: The user who created the task
 *           example: "user1"
 *         assignedTo:
 *           type: string
 *           description: The user who is assigned to the task
 *           example: "user2"
 *       example:
 *         Title: "Task 1"
 *         description: "Task 1 description"
 *         tags: ["tag1", "tag2"]
 *         status: "in-progress"
 *         priority: "none"
 *         dueDate: "2022-01-01"
 *         comments:
 *           - createdAt: "2022-01-01"
 *             commentBy: "user1"
 *             commentData: "comment 1"
 *         createdBy: "XXXXX"
 *         assignedTo: "XXXXX"
 */
