import { User } from "../../../../models/index.js";
import { errorHelper } from "../../../../utils/index.js";

export default async (req, res) => {
  const { userId: friendId } = req.body;

  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00090", req, err.message));
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const friend = await User.findById(friendId);

  if (!friend) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  // check if friendId is in friends
  const isFriend = user.friends.find(
    (friend) => friend.toString() === friendId.toString()
  );

  if (!isFriend) {
    // check if friendId is in friendRequests of user
    const hasRequest = friend.friendRequests.find(
      (request) => request.toString() === user._id.toString()
    );

    if (hasRequest) {
      friend.friendRequests = friend.friendRequests.filter(
        (request) => request.toString() !== user._id.toString()
      );

      await friend.save();

      return res.status(200).json({
        message: "Friend request Canceled",
      });
    }

    return res.status(400).json({
      message: "You are not friends with this user",
    });
  }

  // remove friend from user's friends
  user.friends = user.friends.filter(
    (friend) => friend.toString() !== friendId.toString()
  );
  await user.save();

  // remove user from friend's friends
  friend.friends = friend.friends.filter(
    (friend) => friend.toString() !== user._id.toString()
  );

  await friend.save();

  return res.status(200).json({
    message: "Friend removed",
  });
};
