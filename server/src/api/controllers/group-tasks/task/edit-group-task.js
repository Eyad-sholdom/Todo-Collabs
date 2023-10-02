import { Group, Task } from "../../../../models/index.js";
import { checkIfUserIsAdminOrModeratorOrCreator } from "../group.utils.js";

// PUT /api/group/task/:groupId/:taskId
export default async (req, res) => {
  const { groupId, taskId } = req.params;

  const body = req.body;
  const userId = req.user._id;
  try {
    const group = await Group.findById(groupId);

    // check if task exists and is associated with the group
    const task = await group.tasks.some(
      (task) => task.toString() === taskId.toString()
    );

    if (!task) {
      return res.status(400).json({
        message: "Task not found",
      });
    }

    const isUserAdminOrModerator = await checkIfUserIsAdminOrModeratorOrCreator(
      group,
      userId
    );

    if (!isUserAdminOrModerator) {
      return res.status(400).json({
        message: "You are not allowed to edit this task",
      });
    }

    const taskToEdit = await Task.findById(taskId);

    taskToEdit.set(body);
    delete taskToEdit._doc.__v;

    await taskToEdit.save();

    return res.status(200).json(taskToEdit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
