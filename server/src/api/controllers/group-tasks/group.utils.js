import { Group, User } from "../../../models/index.js";

export async function GetUserIfExists(memberId) {
  return User.findById(memberId);
}

export async function GetUsersIfExist(memberIds) {
  return await User.find({
    _id: {
      $in: memberIds,
    },
  });
}

export async function GetGroupIfExists(groupId) {
  return await Group.findById(groupId);
}

export async function checkIfUserIsAdminOrModeratorOrCreator(group, userId) {
  return await group.members.some(
    (member) =>
      member.user.toString() === userId.toString() &&
      (member.role.toString() === "Admin" ||
        member.role.toString() === "Moderator" ||
        group.createdBy.toString() === userId.toString())
  );
}

export async function addMembersToGroup(group, memberIds) {
  // group.members.user = ObjectId(memberId);

  memberIds.forEach(async (memberId) => {
    console.log("memberId", memberId);
    if (!(await checkIfUserIsMemberOfGroup(group, memberId))) {
      console.log("memberId Add", memberId);
      group.members.push({
        user: memberId,
        role: "Normal",
      });
    }
  });
  await group.save();
}

export async function checkIfUserIsMemberOfGroup(group, userId) {
  return await group.members.some(
    (member) => member.user.toString() === userId.toString()
  );
}

export async function removeMembersFromGroup(groupId, memberIds) {
  return await Group.findByIdAndUpdate(groupId, {
    $pull: {
      members: { $in: memberIds },
    },
  });
}
