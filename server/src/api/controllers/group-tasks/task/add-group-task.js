import mongoose from "mongoose";
import { Group, Task } from "../../../../models/index.js";
import { validateTask } from "./../../../validators/task.validator.js";
//  POST /api/group/task/:groupId
export default async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const body = req.body;
    const userId = req.user._id;
    const assignedTo = req.body.assignedTo || userId;

    req.body.assignedTo = assignedTo;
    req.body.tags = req.body.tags || [];
    req.body.priority = req.body.priority || "low";

    const group = await Group.findById(groupId);
    const user = await group.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    ///THIS FUCKING ME UP
    delete body.tags;

    const checkVal = await validateTask(body);
    if (!group || !user || !checkVal) {
      const errorMessage = message(group, user);
      return res.status(400).json(errorMessage);
    }

    const newTask = new Task(body);
    newTask.createdBy = mongoose.Types.ObjectId(userId);

    await newTask.save();

    group.tasks.push(newTask._id);

    await group.save();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function message(group, user, checkVal) {
  let errors = {};
  if (!group) errors.groupError = "group does not exist\n";
  if (!user) errors.userError = "user is not a member of the group\n";
  if (!checkVal) errors.taskError = "invalid task fields\n";
  return errors;
}
