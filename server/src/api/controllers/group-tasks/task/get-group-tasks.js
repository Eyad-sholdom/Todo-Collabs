import { Group, Task } from "../../../../models/index.js";

// GET /api/group/task/:groupId
export default async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.user._id;

    const group = await Group.findById(groupId);
    const user = group.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    if (!group || !user) {
      const errorMessage = message(group, user);
      return res.status(400).json(errorMessage);
    }

    const tasks = await Task.find({ _id: { $in: group.tasks } });

    if (tasks) {
      // populate assignedTo field
      await Task.populate(tasks, {
        path: "assignedTo",
        select: "name username",
      });
    }

    const checkTasks = tasks ? tasks : [];

    return res.status(200).json(checkTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function message(group, user) {
  let errors = {};
  if (!group) errors.groupError = "Group does not exist\n";
  if (!user) errors.userError = "User is not a member of the group\n";
  return errors;
}
