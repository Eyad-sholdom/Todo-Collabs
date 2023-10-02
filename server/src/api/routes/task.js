import { Router } from "express";
import { auth } from "../middlewares/index.js";
import {
  deleteGroupTask,
  editGroupTask,
  getGroupTasks,
  addGroupTask,
} from "../controllers/group-tasks/index.js";

const router = Router();

// Get Group Tasks
router.get("/:groupId", auth, getGroupTasks);

// Add Group Task
router.post("/:groupId", auth, addGroupTask);

// Edit Group Task
router.put("/:groupId/:taskId", auth, editGroupTask);

// Delete Group Task
router.delete("/:groupId/:taskId", auth, deleteGroupTask);

export default router;
