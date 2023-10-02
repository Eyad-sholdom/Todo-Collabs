import { Group } from "../../../../models/index.js";
import {
  GetGroupIfExists,
  checkIfUserIsAdminOrModeratorOrCreator,
} from "../group.utils.js";

export default async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  // check if the group exists
  const group = await GetGroupIfExists(groupId);

  if (!group) {
    return res.status(400).json({
      message: "Group not found",
    });
  }

  const isUserHasPre = await checkIfUserIsAdminOrModeratorOrCreator(
    group,
    userId
  );
  if (!isUserHasPre) {
    return res.status(400).json({
      message: "You are not allowed to delete this group",
    });
  }

  // delete the group
  await Group.findByIdAndDelete(groupId).catch((err) => {
    return res.status(400).json({
      message: "Group not deleted",
      "error:": err,
    });
  });

  return res.status(200).json({
    message: "Group deleted",
    _id: group._id,
  });
};
