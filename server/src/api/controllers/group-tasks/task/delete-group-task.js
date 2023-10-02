import mongoose from "mongoose";
import { Group, Task, User } from "../../../../models/index.js";
import { validateTask } from "../../../validators/task.validator.js";

// DELETE /api/group/task/:groupId/:taskId

export default async (req, res) => {
  const { groupId, taskId } = req.params;
  const body = req.body;
  const userId = req.user._id;
  try {
    const group = await Group.findById(groupId);
    const user = await group.members.some(
      (member) =>
        (member.user.toString() === userId.toString() &&
          member.role.toString() === "Admin") ||
        member.role.toString() === "Moderator" ||
        User.findById(mongoose.Types.ObjectId(userId))
    );
    const checkTaskAssoc = await group.tasks.some(
      (task) => task.toString() === taskId.toString()
    );
    // const taskToEdit = await Task.findById(taskId);

    const checkVal = await validateTask(body);

    if (!group || !user || !checkVal || !checkTaskAssoc) {
      const errorMessage = message(group, user, checkVal, checkTaskAssoc);
      return res.status(400).json(errorMessage);
    }

    await Task.findByIdAndDelete(taskId);
    // await taskToEdit.save();

    return res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function message(group, user, checkVal, checkTaskAss) {
  let errors = {};
  if (!group) errors.groupError = "group does not exist\n";
  if (!user) errors.userError = "You are not allowed to delete this task\n";
  if (!checkVal) errors.taskError = "task does not exist\n";
  if (!checkTaskAss) errors.checkTaskAss = "Bad request\n";
  return errors;
}
