import { User } from "../../../../models/index.js";
import { errorHelper } from "../../../../utils/index.js";

export default async (req, res) => {
  const { userId: receiverId } = req.body;

  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00090", req, err.message));
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const receiverUser = await User.findById(receiverId).catch((err) => {
    return res.status(500).json(errorHelper("00090", req, err.message));
  });
  if (!receiverUser) {
    return res.status(400).json({
      message: "Receiver not found",
    });
  }

  // check if receiver is already in friends
  const isFriend = user.friends.find(
    (friend) => friend.toString() === receiverId.toString()
  );
  if (isFriend) {
    return res.status(400).json({
      message: "You are already friends with this user",
    });
  }

  // check if request is already sent
  const hasRequest = receiverUser.friendRequests.find((request) => {
    return request.toString() === user._id.toString();
  });

  if (hasRequest) {
    return res.status(400).json({
      message: "You already sent a request to this user",
    });
  }

  // add friend request to receiver
  receiverUser.friendRequests.push(user);
  await receiverUser.save();

  return res.status(200).json({
    message: "Friend request sent",
  });
};
