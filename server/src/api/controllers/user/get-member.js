import { User, Group } from "../../../models/index.js";
import { errorHelper } from "../../../utils/index.js";

export default async (req, res) => {
  const { memberId } = req.params;

  // check if memberId is valid
  if (!memberId) {
    return res.status(400).json({
      message: "Member Id is required",
    });
  }

  // check if memberId is valid
  const member = await User.findById(memberId).catch((err) => {
    return res.status(500).json(errorHelper("00088", req, err.message));
  });

  if (!member) {
    return res.status(400).json({
      message: "Member does not exist",
    });
  }

  delete member._doc.__v;
  delete member._doc.password;

  const friends = await User.find({ _id: { $in: member.friends } })
    .select("_id username name photo lastLogin")
    .catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });

  const groups = await Group.find({ _id: { $in: member.joinedGroups } })
    .select("_id name description")
    .catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });

  member._doc.friends = friends;
  member._doc.joinedGroups = groups;

  // check if user has a request from the member
  const hasRequest = member.friendRequests?.find(
    (request) => request.toString() === req.user._id.toString()
  );

  if (hasRequest) {
    member._doc.friendStatus = "pending";
  } else {
    member._doc.friendStatus = null;
  }

  if (!hasRequest) {
    const user = await User.findById(req.user._id);

    const isMemberFriend = user.friends.find(
      (friend) => friend.toString() === member._id.toString()
    );

    if (isMemberFriend) {
      member._doc.friendStatus = "friend";
    }
  }

  console.log(member._doc.friendStatus);

  delete member._doc.friendRequests;

  return res.status(200).json(member);
};
