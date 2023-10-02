import { Group } from "../../../../models/index.js";

export default async (req, res) => {
  // able to update: title, tags, member
  const { groupId } = req.params;
  const body = req.body;

  if (!groupId) {
    return res.status(400).json({
      message: "Group id is required",
    });
  }

  let group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({
      message: "Group not found",
    });
  }

  if ("title" in body) {
    if (body.title.length > 50) {
      return res.status(400).json({
        message: "Title is too long",
      });
    }
  }

  if ("tags" in body) {
    if (body.tags.length > 20) {
      return res.status(400).json({
        message: "Too many tags",
      });
    }
  }

  if ("members" in body) {
    if (body.members.length > 20) {
      return res.status(400).json({
        message: "Too many members",
      });
    }
  }
  // update the group

  group.set(body);
  await group.save();
  delete group._doc.__v;

  // return group
  return res.status(200).json(group);
};
