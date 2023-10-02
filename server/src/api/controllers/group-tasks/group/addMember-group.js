import { Group, User } from "../../../../models/index.js";
import mongoose from "mongoose";

import * as groupUtils from "../group.utils.js";

export default async (req, res) => {
  const { groupId } = req.params;
  const { _id: userId } = req.user;
  const memberIds = req.body.memberIds;
  if (!memberIds) {
    return res.status(400).json({
      message: "Field 'memberIds' is required",
    });
  }

  try {
    // check if member exists in the database
    const member = await groupUtils.GetUserIfExists(userId);

    if (!member) {
      return res.status(400).json({
        message: "Member does not exist",
      });
    }

    const group = await groupUtils.GetGroupIfExists(groupId);
    if (!group) {
      return res.status(400).json({
        message: "Group does not exist",
      });
    }

    const isAdminOrModerator = await groupUtils.checkIfUserIsAdminOrModeratorOrCreator(
      group,
      userId
    );
    if (!isAdminOrModerator) {
      return res.status(400).json({
        message: "You are not allowed to add members to this Group",
      });
    }

    const membersExist = await groupUtils.GetUsersIfExist(memberIds);

    if (!membersExist) {
      return res.status(400).json({
        message: "One or more members do not exist",
      });
    }

    await groupUtils.addMembersToGroup(group, memberIds);

    member.joinedGroups.push(group._id);
    await member.save();

    res.status(200).json({
      message: "Members added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding members to the group",
    });
  }
};
