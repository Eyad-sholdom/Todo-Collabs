import Mongoose from "mongoose";
import { Group, User, Task } from "../../../../models/index.js";

export default async (req, res) => {
  if (req.params.groupId) {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(400).json({
        message: "Group not found",
      });
    }
    // check if user is a member of the group
    const isMember = group.members.find(
      (member) => member.user.toString() === req.user._id.toString()
    );
    if (!isMember) {
      return res.status(400).json({
        message: "You are not a member of this group",
      });
    }

    // get group members
    const members = await User.find({
      _id: {
        $in: group.members.map((member) => member.user),
      },
    }).select("name username photo lastLogin");

    const tasks = await Task.find({
      _id: {
        $in: group.tasks,
      },
    }).select("title description status");

    // remove __v from group
    delete group._doc.__v;

    group._doc.members = group._doc.members.map((member) => {
      const user = members.find(
        (user) => user._id.toString() === member.user.toString()
      );
      return {
        ...user._doc,
        role: member.role,
      };
    });

    return res.status(200).json({
      ...group._doc,
      tasks,
    });
  }
  try {
    const groups = await Group.aggregate([
      {
        $match: {
          members: {
            $elemMatch: { user: Mongoose.Types.ObjectId(req.user._id) },
          },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $addFields: {
          membersCount: {
            $size: "$members",
            // $arrayElemAt: ["$members", 0],
            // $filter: {
            //   input: "$members",
            //   as: "member",
            //   cond: { $eq: ["$$member.user", Mongoose.Types.ObjectId(req.user._id)] }
          },
          TasksCount: {
            $size: "$tasks",
          },
        },
      },
      // select only required fields
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          updatedAt: 1,
          membersCount: 1,
          TasksCount: 1,
        },
      },
    ]).catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        error: JSON.stringify(err),
      });
    });
    console.log(groups);
    return await res.status(200).json(groups);
  } catch (err) {
    return await res.status(500).json({
      message: "Internal server error",
      error: JSON.stringify(err),
    });
  }
  // return groups
};
