import { Router } from "express";
import { auth } from "../middlewares/index.js";
import {
  addGroup,
  deleteGroup,
  editGroup,
  getGroup,
  addGroupMember,
} from "../controllers/group-tasks/index.js";

import groupTask from "./task.js";

const router = Router();

// Add Group
router.post("/new", auth, addGroup);

router.post("/:groupId/addMember", auth, addGroupMember);

// Get Group
router.get("/groups", auth, getGroup);

// Get Individual Group
router.get("/:groupId", auth, getGroup);

// Edit Group
router.put("/:groupId", auth, editGroup);

// Delete Group
router.delete("/:groupId", auth, deleteGroup);

// Group Tasks
router.use("/task", groupTask);

export default router;
